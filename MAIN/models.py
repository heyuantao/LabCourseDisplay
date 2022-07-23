# -*- coding: utf-8 -*-

from django.db import models
import logging

from MAIN.exceptions import MessageException

logger = logging.getLogger(__name__)

# Create your models here.
class ExperimentalCenterModel(models.Model):
    name = models.CharField(max_length=100)


class CourseModel(models.Model):
    class Meta:
        ordering = ['-id']

    ##########################################################################################################################
    course_date = models.DateField()                           #课程的上课时间；例如XX年XX月XX日
    course_period = models.CharField(max_length=10)            #课程的节次；例如1-2节
    course_week_order = models.IntegerField()                  #课程的周次，该字段为辅助信息；例如2周
    lab = models.CharField(max_length=100)                     #实验室的名称；例如"网络工程实验室"
    experimental_name = models.CharField(max_length=100)         #实验课的名字
    experimental_item = models.CharField(max_length=100)         #实验项目名字
    experimental_code = models.CharField(max_length=60)          #实验项目代码
    teacher = models.CharField(max_length=50)           #实验教师
    student_subject = models.CharField(max_length=50)   #学生专业
    student_count = models.IntegerField()               #学生人数
    experimental_center = models.ForeignKey(ExperimentalCenterModel, related_name="courses",on_delete=models.CASCADE)    #课程所属的实验中心
    ##########################################################################################################################

    @classmethod
    def delete_course_by_experimental_id(cls, id):
        try:
            experimental_center_instance = ExperimentalCenterModel.objects.get(id = id)
            CourseModel.objects.filter(experimental_center = experimental_center_instance).delete()
        except ExperimentalCenterModel.DoesNotExist:
            raise MessageException('实验中心对应的ID不存在')








