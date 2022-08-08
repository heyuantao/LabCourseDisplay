# -*- coding: utf-8 -*-
"""LabCourseDispaly URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,re_path
from django.conf.urls import include, url
from django.views.generic import RedirectView

from MAIN.views import GuestView, ManagerView, IndexView

urlpatterns = [
    path('admin/', admin.site.urls),
    #old style url
    #re_path('^main/', include('MAIN.urls')),
    #re_path('^api/', include('API.urls')),
    #re_path('^$', RedirectView.as_view(url="/main")),
    path('main/', include('MAIN.urls')),
    path('api/', include('API.urls')),

    #这是几个角色的主页面，该主页面仅仅是为了引入前后端分离模式下的前端文件
    path('guest/', GuestView.as_view(), name='guest_home_page'),
    path('manager/', ManagerView.as_view(), name='manager_home_page'),
    path('', IndexView.as_view(), name='index'),
    #path('', RedirectView.as_view(url="/main")),
]
