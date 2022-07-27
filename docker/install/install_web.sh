#echo "Install virtualenv and requirements !"
#cd /app/EEAS && make installenv

#echo "Install node yarn and node modules !"
#cd /app/EEAS && make installnodeenv

#echo "Build node modules !"
#cd /app/EEAS && make buildnodemodules

#echo "Clear useless node modules !"
#cd /app/EEAS && make cleannodemodules

#echo "Copy Nginx and Supervisor Config Fle !"
#cp /app/EEAS/docker/nginx/default /etc/nginx/sites-enabled/default
#cp /app/EEAS/docker/supervisor/eeas.conf /etc/supervisor/conf.d/eeas.conf

#echo "Install Finished !"
