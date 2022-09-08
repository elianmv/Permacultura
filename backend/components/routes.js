const express = require('express');
const routes = express.Router()
const { login } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/',(req,res) => {
    res.send('Hello')
})

routes.post('/login',(req,res) => {
    login(pool,req,result => {
        res.json(result)
    })
})

routes.post('/Register',(req,res) => {
    login(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
