# -*- coding: utf-8 -*-

import logging

from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render

# Create your views here.
from MAIN.serializers import UserSerializer

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