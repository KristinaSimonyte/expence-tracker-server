function SuccessCase(res, data, status = 200) {
    res.status(status).json({
      success: true,
      data,
    });
  }
  
  function ErrorCase(res, message = 'error with db function', status = 500) {
    res.status(status).json({
      success: false,
      message,
    });
  }
  module.exports = { SuccessCase, ErrorCase };