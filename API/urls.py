# -*- coding: utf-8 -*-

from django.urls import path, re_path
from django.conf.urls import include, url
from django.views.generic import RedirectView

from API.views import UserAPIView, ExperimentalCenterListAPIView

urlpatterns = [
    #url(r'^$', IndexView.as_view(), name='index'),

    #用户信息API
    path('v1/user/', UserAPIView.as_view()),

    #实验中心API
    path('v1/experimentalcenter/', ExperimentalCenterListAPIView.as_view()),
    path('v1/experimantalcenter/<int:id>/', UserAPIView.as_view()),
]