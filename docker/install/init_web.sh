#!/usr/bin/env bash
cd /app/LabCourseDisplay/

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py createadminuser -u admin@example.com -p example.com

python3 manage.py init_experimental_center
