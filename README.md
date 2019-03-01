# simple-order-with-tax
simple order item with tax calculate using nodejs, express, docker, and sequelize

## folder explanation
1. ``` mysql ``` init sql and docker file sql
2. ``` app ``` our source app for building api

## instalation
1. clone this project 
   ```
   https://github.com/shiro-yasha/simple-order-with-tax.git
   ```
2. install docker
3. install node
3. cd into our project
   ```
   cd simple-order-with-tax
   ```
4. type in terminal
   ```
   docker-compose up
   ```

## api
```
GET  localhost:6500/v1/order  get all order with tax calculation
POST localhost:6500/v1/order  insert new order
```
