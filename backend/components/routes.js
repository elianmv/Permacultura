const express = require('express');
const routes = express.Router()
const { login, select } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/',(req,res) => {
    select(pool,req,result => {
        res.json(result)
    })
})

routes.post('/login',(req,res) => {
    login(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
