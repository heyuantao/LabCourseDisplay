# -*- coding: utf-8 -*-

from django.urls import path, re_path
from django.conf.urls import include, url
from django.views.generic import RedirectView
from MAIN.views import  IndexView

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
]