"use strict";
const bcrypt = require('bcryptjs');

const successResponse = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    data,
  });
};

const failResponse = (res, err = 'Something went wrong', status = 500) => {
  res.status(status).json({
    success: false,
    error: [err],
  });
};

const makeResponce = (res, repData, additionalMessage) => {
  return !repData.isSuccess
    ? failResponse(res, repData.err)
    : successResponse(
        res,
        !!additionalMessage ? additionalMessage : repData.msg
      );
};

module.exports = {
successResponse,
failResponse,
makeResponce,
};
