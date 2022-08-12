docker run -d -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=labcoursedisplay --network=host  -v $PWD/docker/mysqld/mysqld.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf  --name=db mysql:5.6
