# -*- coding: utf-8 -*-

from django.urls import path, re_path
from django.conf.urls import include, url
from django.views.generic import RedirectView

from API.views import UserAPIView, ExperimentalCenterListAPIView, ExperimentalCenterRetrieveAPIView, \
    ExperimentalCenterCourseListAPIView, ExperimentalCenterCourseRetriveAPIView, \
    ExperimentalCenterTodayCourseListAPIView
from API.views import ExperimentalCenterCourseFileUploaderView

urlpatterns = [
    #url(r'^$', IndexView.as_view(), name='index'),

    #用户信息API,访客权限即可
    path('v1/user/', UserAPIView.as_view()),

    #实验中心API,访客权限即可
    path('v1/experimentalcenter/', ExperimentalCenterListAPIView.as_view()),
    path('v1/experimentalcenter/<int:id>/', ExperimentalCenterRetrieveAPIView.as_view()),

    #实验中心课程文件上传API,其中ID为实验中心的主键,该API需要管理员权限
    path('v1/experimentalcenter/<int:id>/file/',ExperimentalCenterCourseFileUploaderView.as_view()),
    #实验中心课程API，该组API需要管理员权限
    path('v1/experimentalcenter/<int:id>/course/',ExperimentalCenterCourseListAPIView.as_view()),
    path('v1/experimentalcenter/<int:id>/course/<int:cid>/',ExperimentalCenterCourseRetriveAPIView.as_view()),


    #实验中心课程API,访客专用API接口，用于在大屏幕上展示信息,访客权限即可
    path('v1/guest/experimentalcenter/<int:id>/todaycourse/',ExperimentalCenterTodayCourseListAPIView.as_view())


]