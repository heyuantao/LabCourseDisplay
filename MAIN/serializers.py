# -*- coding: utf-8 -*-
from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()

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