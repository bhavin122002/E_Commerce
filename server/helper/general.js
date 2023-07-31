module.exports.successResponse = (status, error, message, result) => {
  return { status, error, message, result };
};
module.exports.errorResponse = (sts = 501, error, msg = " SERVER  ERROR ") => {
  return { status: sts, error, message: msg };
};
