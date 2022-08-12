#This is Lab Course Display(实验室课程展示系统)


##1 Run in docker

###1.1 Build the docker images

```
git clone https://github.com/heyuantao/LabCourseDisplay.git /app/LabCourseDisplay
cd LabCourseDisplay                        #change directory to project root
docker build -t labcoursedisplay:1.0 .
```

###1.2 Start the mysql docker
```
sudo mkdir -p /app
sudo chown -R ${USER}:${USER} /app/  
sudo mkdir -p /app/data/db
cd LabCourseDisplay                                 #change directory to project root because the following command will use mysql configuration file
docker run -d --name=mysql --restart=always --network=host -e MYSQL_ROOT_PASSWORD=19831122 -e MYSQL_DATABASE=labcoursedisplay -v /app/data/db:/var/lib/mysql -v $PWD/docker/mysqld/mysqld.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf mysql:5.6
```

###1.3 Start the app docker
```
docker run -d --name=labcoursedisplay --restart=always --network=host -e DB_PASSWORD=19831122 -e DB_HOST=127.0.0.1 -v /app/data/logs/:/var/log/supervisor/ labcoursedisplay:1.0
#后期还要加入微服务的连接信息
```

###1.4 Exec into web container and do init
```
docker exec -it <web_container_id> /bin/bash        #exec into the container
make initsystem                                     #this will call the script in /app/EEAS/docker/install/init_web.sh
```
##2 Development
###2.1  Backend
This software run on python 3 and django 1.11.1,and the database is MySQL 5.7.The install script will install it on 
   ubuntu 16.04
   
```
python3 manage.py makemigration
python3 manage.py migrate

```

###2.2 Init the qiniu storage

```
python3 manage.py initqiniu.py
```
   
###2.3 Frontend
   The Front use react and antd and was create by create-react-app
   Change the NPM and YARN registry using the following command!

```
npm config set registry https://registry.npm.taobao.org
npm config get

yarn config set registry https://registry.npm.taobao.org
yarn config get registry
```

###2.4 Install the Node Module and Build 
```
cd EEAS
make installnodemodules         #you need install npm and yarn to install and build node modules
make buildnodemodules           #build the nodemodules
make cleannodemodules           #remove the nodemodules directory before build docker images
````

###2.5 Backup the data
```
#list the exam information in list format
python3 manage.py backupenrollmentmedia

#download the zip files of one enrollments to '/tmp/exam_id'
python3 manage.py backupenrollmentmedia -e exam_id -d /tmp/exam_id/  

#download the zip files and clear qiniu and mysql record
python3 manage.py backupenrollmentmedia -e exam_id -d /tmp/exam_id/ -c  #if you need clear the database
```


###2.6 Other command
```markdown
change the password
python manage.py changepassword admin@example.com
```

```markdown
List or Delte examination
python manage.py examinations -l 
python manage.py examinations -d id
