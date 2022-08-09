# -*- coding: utf-8 -*-

from django.shortcuts import render

# Create your views here.
from django.views.generic.base import View
from django.http import HttpResponseRedirect,HttpResponse


class IndexView(View):
    #template = 'index.html'
    template = "guest/build/index.html"
    def get(self, request):
        #pageContext = request.GET.dict()
        #return render(request, self.template, pageContext)
        return HttpResponse("这是实验室课程系统主站")

class GuestView(View):
    template = "guest/build/index.html"

    def get(self, request):
        # pageContext = request.GET.dict()
        # return render(request, self.template, pageContext)
        return render(request, self.template)
        #return HttpResponse("这是访客主界面!")

class ManagerView(View):
    #template = "guest/build/index.html"
    template = "manager/build/index.html"

    def get(self, request):
        #pageContext = request.GET.dict()
        return render(request, self.template)
        #return HttpResponse("这是管理员主界面!")