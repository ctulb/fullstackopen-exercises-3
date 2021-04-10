const globalErrorHandler = (error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    return next(error);
  }
  switch (error.name) {
    case 'CastError':
      res.status(400).json({ error: 'malformed id in request' });
      break;
    case 'ValidationError':
      res.status(400).json({ error });
    default:
      res.status(500).json({ error });
      break;
  }
};

module.exports = globalErrorHandler;
