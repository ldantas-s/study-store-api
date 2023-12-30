export const logErrors = (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(
      JSON.stringify(
        { ...error, message: error.message, stack: error.stack },
        undefined,
        ' '
      )
    );
  }
  next(error);
};

export const handleErrors = (error, req, res, next) => {
  res.status(error.statusCode).json(error.serialize());
};
