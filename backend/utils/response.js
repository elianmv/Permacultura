const httpStatus = require("http-status");

const responseOk = (message) => {
    return  {
        status: httpStatus.OK,
        response:message
      }
};

const responseOkMess = (response,message) => {
  return  {
      status: httpStatus.OK,
      response:response,
      message:message
    }
};

const responseOkLogin = (message,response) => {
    return  {
        status: httpStatus.OK,
        response:response,
        message:message
      }
};

const responseCreatedwithBody = (response,message) => {
  return  {
      status: httpStatus.CREATED,
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
        status: httpStatus.BAD_REQUEST,
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
    responseOkMess,
    responseOkLogin,
    responseCreated,
    responseError,
    responseNoContent,
    responseUnauthorized,
    responseCreatedwithBody
  };

