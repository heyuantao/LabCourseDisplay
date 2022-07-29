# -*- coding: utf-8 -*-
from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()

    def to_representation(self, instance):
        ret = super(UserSerializer, self).to_representation(instance)
        ret['id'] = instance.id
        return ret

    def create(self, validated_data):
        user_instance = User(**validated_data)
        user_instance.save()
        return user_instance

    def update(self, instance, validated_data):
        with transaction.atomic():
            user_instance = instance
            user_password_string = validated_data.get("password")
            if user_password_string != "":
                user_instance.set_password(user_password_string)
                user_instance.save()
            return user_instance

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=150)

    def validate_username(self, username):
        if len(username)>20:
            raise serializers.ValidationError("用户名超过20的字符")

    def validate_password(self, password):
        if len(password)>20:
            raise serializers.ValidationError("密码超过20的字符")

    def validate(self, attrs):
        username= attrs['username']
        password= attrs['password']
        user = authenticate({'username':username,'password':password})
        if user is None or not user.is_active:
            raise serializers.ValidationError("用户不存在或用户已被禁用")