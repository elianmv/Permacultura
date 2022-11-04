const express = require('express');
const app = express();
const api = require('./config/api')
require('dotenv').config();
const cors = require('cors')
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const port = process.env.APP_PORT;

app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(cors())
app.use(express.json())

app.use('/api/v1', api.v1)

app.listen(port,(error) => {
    console.log(`listening in port ${port} `)
})
 