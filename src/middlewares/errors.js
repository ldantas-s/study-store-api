export const logErrors = (error, req, res, next) => {
  console.error(
    JSON.stringify(
      { ...error, message: error.message, stack: error.stack },
      undefined,
      ' '
    )
  );
  next(error);
};

export const handleErrors = (error, req, res, next) => {
  res
    .status(error.statusCode)
    .json({ type: error.type, message: error.message, body: error.body });
};
