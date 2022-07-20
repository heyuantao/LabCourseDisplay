# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand, CommandError
import traceback

from MAIN.models import ExperimentalCenterModel


class Command(BaseCommand):
    help = "\
        Create default experimental center ! \n\
            "

    def handle(self, *args, **options):
        instance, created = ExperimentalCenterModel.objects.get_or_create(name="计算机技术实验中心")
        if created:
            self.stdout.write(self.style.SUCCESS("计算机技术实验中心创建成功!"))
        else:
            self.stdout.write(self.style.SUCCESS("计算机技术实验中心已经存在 !"))

        instance, created = ExperimentalCenterModel.objects.get_or_create(name="电子信息实验中心")
        if created:
            self.stdout.write(self.style.SUCCESS("电子信息实验中心创建成功!"))
        else:
            self.stdout.write(self.style.SUCCESS("电子信息实验中心已经存在 !"))

