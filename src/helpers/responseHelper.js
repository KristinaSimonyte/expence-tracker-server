function successResponse(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}
function failResponse(res, err = 'Something went wrong', status = 500) {
  res.status(status).json({
    success: false,
    error: [err],
  });
}

function makeResponce(res, repData, additionalMessage) {
  return !repData.isSuccess
    ? failResponse(res, repData.err)
    : successResponse(
        res,
        !!additionalMessage ? additionalMessage : repData.msg
      );
}
module.exports = {
  successResponse,
  failResponse,
  makeResponce,
};
