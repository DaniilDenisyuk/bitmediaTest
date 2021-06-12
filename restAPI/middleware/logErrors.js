export const logErrors = (err, req, res, next) => {
  console.error(err.error || err.message);
  next(err);
};
