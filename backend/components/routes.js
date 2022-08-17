const express = require('express');
const routes = express.Router()
const { getAll } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/',(req,res) => {
    res.send('Hello')
})

routes.get('/getAll',(req,res) => {
    getAll(pool,result => {
        res.json(result)
    })
})

module.exports = routes;
    
