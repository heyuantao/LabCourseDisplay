# -*- coding: utf-8 -*-

from django.urls import path, re_path
from django.conf.urls import include, url
from django.views.generic import RedirectView

from API.views import UserAPIView, ExperimentalCenterListAPIView, ExperimentalCenterRetrieveAPIView
from API.views import ExperimentalCenterCourseFileUploaderView

urlpatterns = [
    #url(r'^$', IndexView.as_view(), name='index'),

    #用户信息API
    path('v1/user/', UserAPIView.as_view()),

    #实验中心API
    path('v1/experimentalcenter/', ExperimentalCenterListAPIView.as_view()),
    path('v1/experimentalcenter/<int:id>/', ExperimentalCenterRetrieveAPIView.as_view()),

    #实验中心课程文件上传API,其中ID为实验中心的主键
    path('v1/experimentalcenter/<int:id>/file/',ExperimentalCenterCourseFileUploaderView.as_view())

    #实验中心课程API

]