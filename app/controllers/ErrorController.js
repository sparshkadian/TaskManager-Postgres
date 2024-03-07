export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode;
  const status = err.status;
  res.status(statusCode).json({
    status,
    message: err.message,
    stackTrace: err.stack,
  });
};
