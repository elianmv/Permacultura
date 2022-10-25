const httpStatus = require("http-status");

const responseOk = (message) => {
    return  {
        status: httpStatus.OK,
        response:message
      }
};

const responseOkLogin = (message,response) => {
    return  {
        status: httpStatus.OK,
        response:response,
        message:message
      }
};

const responseCreated = (message) => {
    return  {
        status: httpStatus.CREATED,
        message:message
      }
};

const responseError = (message) => {
    return  {
        status: httpStatus.OK,
        message:message
      }
}

const responseNoContent = (message) => {
    return  {
        status: httpStatus.NO_CONTENT,
        message:message
      }
}

const responseUnauthorized = (message) => {
    return  {
        status: httpStatus.UNAUTHORIZED,
        message:message
      }
}

module.exports = {
    responseOk,
    responseOkLogin,
    responseCreated,
    responseError,
    responseNoContent,
    responseUnauthorized
  };

