# -*- coding: utf-8 -*-
from django.db import transaction
from rest_framework import serializers
from MAIN.models import ExperimentalCenterModel

class ExperimentalCenterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['id'] = instance.id
        return ret

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.name = validated_data.get('name',instance.name)
            instance.save()

    def create(self, validated_data):
        experimental_center_instance = ExperimentalCenterModel(**validated_data)
        experimental_center_instance.save()
        return experimental_center_instance


class CourseSerializer(serializers.Serializer):
    ##########################################################################################################################
    course_date = serializers.DateField()  # 课程的上课时间；例如XX年XX月XX日
    course_period = serializers.CharField(max_length=10)  # 课程的节次；例如1-2节
    course_week_order = serializers.IntegerField()  # 课程的周次，该字段为辅助信息；例如2周
    lab = serializers.CharField(max_length=100)  # 实验室的名称；例如"网络工程实验室"
    experimental_name = serializers.CharField(max_length=100)  # 实验课的名字
    experimental_item = serializers.CharField(max_length=100)  # 实验项目名字
    experimental_code = serializers.CharField(max_length=60)  # 实验项目代码
    teacher = serializers.CharField(max_length=50)  # 实验教师
    student_subject = serializers.CharField(max_length=50)  # 学生专业
    student_count = serializers.IntegerField()  # 学生人数
    # 课程所属的实验中心，对应的model为外键
    experimental_center = serializers.CharField(max_length=100)
    ##########################################################################################################################

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['id'] = instance.id
        ret['experimental_center'] = instance.experimental_center.name
        return ret

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass