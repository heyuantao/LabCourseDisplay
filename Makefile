.PHONY: installenv installnodeenv cleannodemodules buildnodemodules savedata loaddata uploaddata downloaddata initsystem help

PATH  := $(PWD)/../venv/bin:$(PWD)/../nodeenv/bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash
#SHELL := /bin/bash

help: ##how to use
	@echo "installenv installnodeenv cleannodemodules buildnodemodules savedata loaddata uploaddata downloaddata initsystem help"


installenv: ##install python env and other tools   #@echo $(PATH)
	@echo "Install Python3.6 env !"
	@virtualenv -p /usr/bin/python3.6 ../venv
	@pip install -r requirements.txt -i https://pypi.douban.com/simple
	@pip install nodeenv -i https://pypi.douban.com/simple


installnodeenv: ##install node env
	@echo "Install NodeEnv and nodemodules!"
	@nodeenv ../nodeenv --node=10.15.3 --prebuilt --mirror=npm.taobao.org
	@npm install -g yarn --registry https://registry.npm.taobao.org
	@cd ./media/guest/    && yarn install --registry  https://registry.npm.taobao.org
	@cd ./media/examinee/ && yarn install --registry  https://registry.npm.taobao.org
	@cd ./media/manager/  && yarn install --registry  https://registry.npm.taobao.org
	@cd ./media/libs/     && yarn install --registry  https://registry.npm.taobao.org


cleannodemodules:
	@echo "Clear the node modules before docker"
	@rm -Rf media/guest/node_modules
	@rm -Rf media/examinee/node_modules
	@rm -Rf media/manager/node_modules


buildnodemodules:
	@echo "Build the node modules"
	@cd ./media/guest/    && yarn run build
	@cd ./media/examinee/ && yarn run build
	@cd ./media/manager/  && yarn run build


savedata: ##save data base and uploads file
	@echo "Save data to /tmp/eeas_db.sql and /tmp/eeas_uploads.tar.gz in debug container !"
	@mysqldump -h 127.0.0.1 -u root -p19831122 eeas>/tmp/eeas_db.sql
	@tar -czvf /tmp/eeas_uploads.tar.gz -C /data/ uploads


loaddata:  ##load data to database
	@echo "Load data from /tmp/eeas_db.sql and /tmp/eeas_uploads.tar.gz in debug container !"
	@mysql -h 127.0.0.1 -u root -p19831122 eeas < /tmp/eeas_db.sql
	@tar -zxvf /tmp/eeas_uploads.tar.gz -C /data/uploads  --strip-components 1


uploaddata: ## upload to s3 storage
	@echo "Upload files to s3 ! Please set the ~/.s3cfg file first and install s3cmd !"
	@s3cmd put /tmp/eeas_db.sql       s3://uploads/
	@s3cmd put /tmp/eeas_uploads.tar.gz   s3://uploads/


downloaddata: ## download file from s3
	@echo "Download files to s3 ! Please set the ~/.s3cfg file first and install s3cmd !"
	@s3cmd get s3://uploads/eeas_db.sql           /tmp/
	@s3cmd get s3://uploads/eeas_uploads.tar.gz   /tmp/


initsystem: ##init system
	@echo "Using the /app/EEAS/docker/install/init_web.sh script to init the system !"
	@bash /app/EEAS/docker/install/init_web.sh
