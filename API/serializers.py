# -*- coding: utf-8 -*-
from django.db import transaction
from rest_framework import serializers

class ExperimentalCenter(serializers.Serializer):
    name = serializers.CharField(max_length=100)

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.name = validated_data.get('name',instance.name)
            instance.save()

    def create(self, validated_data):
        experimental_center_instance = ExperimentalCenter(**validated_data)
        experimental_center_instance.save()
        return experimental_center_instance