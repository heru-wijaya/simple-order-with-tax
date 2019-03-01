## Pull the mysql:5.7 image
FROM mysql:5.7

# database = test and password for root = 12345

ENV MYSQL_ROOT_PASSWORD 12345
ENV MYSQL_DATABASE test

# when container will be started, we'll have `test` database created with this schema
COPY ./init-order.sql /docker-entrypoint-initdb.d/