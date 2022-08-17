const express = require('express');
const app = express();
const api = require('./config/api')
require('dotenv').config();



const port = process.env.APP_PORT;

app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(express.json())

app.use('/api/v1', api.v1)

app.listen(port,(error) => {
    console.log(`listening in port ${port} `)
})
 