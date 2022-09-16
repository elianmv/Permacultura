const express = require('express');
const routes = express.Router()
const { login, servicios, register } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/servicios',(req,res) => {
    servicios(pool,req,result => {
        res.json(result)
    })
})

routes.post('/login',(req,res) => {
    login(pool,req,result => {
        res.json(result)
    })
})

routes.post('/register',(req,res) => {
    register(pool,req,result => {
        res.json(result)
    })
})

routes.put('/Person',(req,res) => {
    login(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
