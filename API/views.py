# -*- coding: utf-8 -*-

import logging
import traceback
from io import BytesIO
import pandas
from datetime import datetime

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render

# Create your views here.
from API.serializers import ExperimentalCenterSerializer
from MAIN.exceptions import MessageException
from MAIN.models import ExperimentalCenterModel, CourseModel
from MAIN.serializers import UserSerializer

from MAIN.tools.xlxsutils import LabCourseXLSXReader,CourseDFProcessor

logger = logging.getLogger(__name__)

class UserAPIView(APIView):  #This class handle user information retrive and update some part of user information,such as address ,email etc

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
        df = CourseDFProcessor.parseDateAndTime(df)
        # pandas.set_option('display.max_columns', None)
        # print(df.head(20))
        #将每行的数据插入数据库

        ###
        ExperimentalCenterModel.objects.get(id= id)

        for i,r in df.iterrows():
            #print(r)
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

            #print(student_count)



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



