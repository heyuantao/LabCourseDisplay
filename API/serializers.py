# -*- coding: utf-8 -*-
from django.db import transaction
from rest_framework import serializers
from MAIN.models import ExperimentalCenterModel

class ExperimentalCenterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['id'] = instance.id
        return ret

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.name = validated_data.get('name',instance.name)
            instance.save()

    def create(self, validated_data):
        experimental_center_instance = ExperimentalCenterModel(**validated_data)
        experimental_center_instance.save()
        return experimental_center_instance