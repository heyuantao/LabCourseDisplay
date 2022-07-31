# -*- coding: utf-8 -*-

import logging
import traceback
from io import BytesIO
import pandas
from datetime import datetime

from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render

# Create your views here.
from rest_framework_simplejwt.tokens import RefreshToken

from API.serializers import ExperimentalCenterSerializer, CourseSerializer
from MAIN.exceptions import MessageException
from MAIN.models import ExperimentalCenterModel, CourseModel
from MAIN.paginations import CustomItemPagination
from MAIN.serializers import UserSerializer, LoginSerializer

from MAIN.tools.xlxsutils import LabCourseXLSXReader,CourseDFProcessor

logger = logging.getLogger(__name__)

class UserAPIView(APIView):  #This class handle user information retrive and update some part of user information,such as address ,email etc
    #pagination_class = CustomItemPagination

    def get(self, request, format=None):
        user_instance = request.user
        if user_instance.is_authenticated:
            serializer = UserSerializer(user_instance)
            return Response(serializer.data, status=200)
        else:
            #response = Response({"redirect_url": reverse("guest")}, status=302)
            response = Response({"redirect_url": "NULL Value !"}, status=302)
            response['Cache-Control'] = 'no-cache'
            return response

    #def post(self, request, format=None):  #系统用该接口查询用户信息，其实不怎么合适，应当放在get函数里
    #    return Response({"error_message": "该接口未启用"}, status=404)

    def put(self, request, format=None):
        user_instance = request.user
        if user_instance.is_authenticated:
            serializer = UserSerializer(user_instance, data=request.data)
            if serializer.is_valid():
                user_instance = serializer.save()
                return Response(UserSerializer(user_instance).data, status=200)
        else:
            #response = Response({"redirect_url": reverse("guest")}, status=302)
            response = Response({"redirect_url": "Null Value !"}, status=302)
            response['Cache-Control'] = 'no-cache'
            return response

class ExperimentalCenterListAPIView(generics.ListCreateAPIView):
    serializer_class = ExperimentalCenterSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return ExperimentalCenterModel.objects.all()

    def get(self, request, *args, **kwargs):
        try:
            return self.list(request, *args, **kwargs)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({}, status=404)

class ExperimentalCenterRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ExperimentalCenterSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return ExperimentalCenterModel.objects.all()

    def retrieve(self, request, *args, **kwargs):
        try:
            id =kwargs['id']
            instance = self.get_queryset().get(id = id)
            seralizer_class = self.get_serializer_class()
            seralizer = seralizer_class(instance)
            return Response(seralizer.data,status=200)
        except ExperimentalCenterModel.DoesNotExist:
            return Response({'error_message': '未找到'}, status=400)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({'error_message': '软件出错'}, status=400)


class ExperimentalCenterCourseFileUploaderView(APIView):
    #permission_classes = (IsAuthenticated,)

    def parse_the_upload_file_and_store_into_db(self, id, uploadfile):
        # uploadfile 是上传的xlsx格式的excel文件
        upload_excel_file_content = uploadfile.read()

        df = LabCourseXLSXReader.read_memory_excel_content_to_pd(upload_excel_file_content)
        df = CourseDFProcessor.parseRowData(df)
        # pandas.set_option('display.max_columns', None)
        # print(df.head(20))
        #将每行的数据插入数据库

        ###
        try:
            experimentalCenterInstance = ExperimentalCenterModel.objects.get(id= id)
        except ExperimentalCenterModel.DoesNotExist:
            raise MessageException('该ID对应的实验中心不存在')

        for i,r in df.iterrows():
            course_week_order = r['周次']
            lab = r['实验室']
            student_subject = r['专业班级']
            student_count = r['学生人数']
            student_count = str(int(student_count))
            experimental_name = r['实验课程']
            experimental_item = r['实验项目']
            experimental_code = r['实验项目代码']
            experimental_code = str(int(experimental_code))
            course_date = r['日期']
            course_date = "{}-{}".format(datetime.now().year,course_date)
            course_date = datetime.strptime(course_date, "%Y-%m-%d")
            course_period = r['节次']
            teacher = r['教师']

            record= {'course_week_order':course_week_order, 'lab':lab, 'student_subject':student_subject, \
                     'student_count':student_count, 'experimental_name':experimental_name, 'experimental_item':experimental_item,\
                     'experimental_code':experimental_code, 'course_date':course_date,'course_period':course_period, \
                     'teacher':teacher, \
                     'experimental_center':experimentalCenterInstance}
            CourseModel(**record).save()

    def post(self, request, id):
        try:
            #先删除该ID对应的所有课程
            CourseModel.delete_course_by_experimental_id(id)
            #处理上传的文件
            upload_excel_file = request.data['file']
            #仅支持以 xlsx 结尾的文件
            #  'application/vnd.ms-excel' not use any more
            #print(upload_excel_file.content_type)

            if upload_excel_file.content_type not in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',]:
                raise MessageException('上传文件仅支持Excel的xlsx格式 !')
            self.parse_the_upload_file_and_store_into_db(id, upload_excel_file)

            return Response({}, status=200)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({'error_message': '软件出错'}, status=400)


class ExperimentalCenterCourseListAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer
    #permission_classes = (IsAuthenticated,)
    pagination_class = CustomItemPagination

    def get_queryset(self):
        id = self.kwargs['id']
        #print("id is{}".format(id))
        return CourseModel.objects.all().filter(experimental_center_id__exact=id)

    def get(self, request, id, *args, **kwargs):
        try:
            return self.list(request, *args, **kwargs)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({}, status=404)

class ExperimentalCenterCourseRetriveAPIView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    # permission_classes = (IsAuthenticated,)
    pagination_class = CustomItemPagination

    def get_queryset(self):
        id = self.kwargs['id']
        return CourseModel.objects.all().filter(experimental_center_id__exact=id)

    def retrieve(self, request, id, cid, *args, **kwargs):
        try:
            instance = self.get_queryset().get(id=cid)
            seralizer_class = self.get_serializer_class()
            seralizer = seralizer_class(instance)
            return Response(seralizer.data, status=200)
        except CourseModel.DoesNotExist:
            return Response({'error_message': '该实验条目不存在 !'}, status=400)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({}, status=404)


class ExperimentalCenterTodayCourseListAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer
    pagination_class = None

    def get_queryset(self):
        id = self.kwargs['id']
        theDate = datetime.today()
        #theDate = datetime.strptime("2022-5-11", "%Y-%m-%d")
        return CourseModel.objects.all().filter(experimental_center_id__exact=id).filter(course_date__exact=theDate)

    def get(self, request, id, *args, **kwargs):
        try:
            return self.list(request, *args, **kwargs)
        except MessageException as e:
            return Response({'error_message':str(e)}, status=404)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({}, status=404)

#该视图仅用于接口权限的测试
class AdminPremissionTestView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        response = Response({"test_message": "Admin work !"}, status=200)
        return response


class LoginAPIView(APIView):
    serializer_class = LoginSerializer

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {'refresh': str(refresh),'access': str(refresh.access_token),}

    def post(self, request, format=None):
        try:
            seralizer_class = self.serializer_class
            seralizer = seralizer_class(data=request.data)
            if not seralizer.is_valid(raise_exception=True):  # raise_exception=True
                raise MessageException('数据出错')
            #此时已经完成了用户名有效性的检查，如果调用authenticate之后得到的是None，则说明密码错误
            userInstance = authenticate(**seralizer.data)
            if userInstance is None:
                raise MessageException('密码错误')
            return Response(self.get_tokens_for_user(userInstance), status=200)
        except ValidationError as e:
            logger.error(traceback.print_exc())
            first_validate_error_message = list(e.detail.values())[0][0]
            return Response({'error_message': first_validate_error_message}, status=400)
        except MessageException as e:
            return Response({'error_message': str(e)}, status=400)
        except Exception as e:
            logger.error(traceback.print_exc())
            return Response({'error_message':'创建出错'},status=400)