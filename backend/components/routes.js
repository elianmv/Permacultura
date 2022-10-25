const express = require('express');
const routes = express.Router()
const { login, servicios, register, updateRegister,persons } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/servicios',(req,res) => {
    servicios(pool,req,result => {
        res.json(result)
    })
})

routes.get('/person',(req,res) => {
    persons(pool,req,result => {
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

routes.put('/updateRegister',(req,res) => {
    updateRegister(pool,req,result => {
        res.json(result)
    })
})


routes.get('/usuarios',(req,res) => {
    users(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
