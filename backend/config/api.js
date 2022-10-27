const apiV1 = require('express')();

const userRouter = require('../components/routes');

apiV1.use('/', userRouter);

module.exports= {
    v1:apiV1
}