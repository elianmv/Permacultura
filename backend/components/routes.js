const express = require('express');
const routes = express.Router()
const { login, publicaciones, register, 
        updateRegister,persons,
        deletePerson,deleteService,cities,
         provServicios, services, editService,
         servicesCreate } = require('./operations')
const { pool } = require('../config/connect')


routes.get('/cities/:country',(req,res) => {
    cities(pool,req,result => {
        res.json(result)
    })
})
routes.get('/services',(req,res) => {
    services(pool,req,result => {
        res.json(result)
    })
})

routes.get('/services/:id',(req,res) => {
    editService(pool,req,result => {
        res.json(result)
    })
})

routes.get('/publicaciones',(req,res) => {
    publicaciones(pool,req,result => {
        res.json(result)
    })
})

routes.get('/publicaciones/:email',(req,res) => {
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

routes.post('/services',(req,res) => {
    servicesCreate(pool,req,result => {
        res.json(result)
    })
})

routes.put('/updateRegister/:emailUser',(req,res) => {
    updateRegister(pool,req,result => {
        res.json(result)
    })
})

routes.delete('/deletePerson/:email',(req,res) => {
    deletePerson(pool,req,result => {
        res.json(result)
    })
})

routes.delete('/services/:id',(req,res) => {
    deleteService(pool,req,result => {
        res.json(result)
    })
})

module.exports = routes;
    
