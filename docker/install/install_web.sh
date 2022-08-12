#!/usr/bin/env bash
echo "Install virtualenv and requirements !"
cd /app/LabCourseDisplay && make installenv

echo "Install node yarn and node modules !"
cd /app/LabCourseDisplay && make installnodeenv

echo "Build node modules !"
cd /app/LabCourseDisplay && make buildnodemodules

echo "Clear useless node modules !"
cd /app/LabCourseDisplay && make cleannodemodules

echo "Copy Nginx and Supervisor Config Fle !"
cp /app/LabCourseDisplay/docker/nginx/default /etc/nginx/sites-enabled/default
cp /app/LabCourseDisplay/docker/supervisor/labcoursedisplay.conf /etc/supervisor/conf.d/labcoursedisplay.conf

echo "Install Finished !"
