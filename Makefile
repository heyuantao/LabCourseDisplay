.PHONY: installenv installnodeenv cleannodemodules buildnodemodules savedata loaddata uploaddata downloaddata initsystem help

PATH  := $(PWD)/../venv/bin:$(PWD)/../nodeenv/bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash
#SHELL := /bin/bash

help: ##how to use
	@echo "installenv installnodeenv cleannodemodules buildnodemodules initsystem help"


installenv: ##install python env and other tools   #@echo $(PATH)
	@echo "Install Python3.6 env !"
	@virtualenv -p /usr/bin/python3.6 ../venv
	@pip install -r requirements -i https://pypi.douban.com/simple
	@pip install nodeenv -i https://pypi.douban.com/simple


installnodeenv: ##install node env
	@echo "Install NodeEnv and nodemodules!"
	@nodeenv ../nodeenv --node=10.15.3 --prebuilt --mirror=npm.taobao.org
	@npm install -g yarn --registry https://registry.npm.taobao.org
	@cd ./media/guest/    && yarn install --registry  https://registry.npm.taobao.org
	@cd ./media/manager/  && yarn install --registry  https://registry.npm.taobao.org


cleannodemodules:
	@echo "Clear the node modules before docker"
	@rm -Rf media/guest/node_modules
	@rm -Rf media/manager/node_modules


buildnodemodules:
	@echo "Build the node modules"
	@cd ./media/guest/    && yarn run build
	@cd ./media/manager/  && yarn run build



initsystem: ##init system
	@echo "Using the /app/LabCourseDisplay/docker/install/init_web.sh script to init the system !"
	@bash /app/LabCourseDisplay/docker/install/init_web.sh
