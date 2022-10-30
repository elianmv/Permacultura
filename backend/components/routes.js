const express = require('express');
const routes = express.Router()
const { login, servicios, register, 
        updateRegister,persons,
        deletePerson,deleteService,cities, provServicios } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/cities/:country',(req,res) => {
    cities(pool,req,result => {
        res.json(result)
    })
})

routes.get('/servicios',(req,res) => {
    servicios(pool,req,result => {
        res.json(result)
    })
})

routes.get('/servicios/:email',(req,res) => {
    provServicios(pool,req,result => {
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

routes.delete('/deletePerson/:email',(req,res) => {
    deletePerson(pool,req,result => {
        res.json(result)
    })
})

routes.delete('/deleteService/:id',(req,res) => {
    deleteService(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
