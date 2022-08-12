#!/usr/bin/env bash
cd /app/LabCourseDisplay/

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py createadminuser -u admin@example.com -p example.com -c 13666666666 -a zua

#python3 manage.py createtestuser
