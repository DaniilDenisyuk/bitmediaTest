export const errorTypes = {
  Forbidden: "ForbiddenError",
  NotFound: "NotFoundError",
  Validation: "ValidationError",
  Unathorized: "UnauthorizedError",
};

export const ForbiddenError = (message = "", error = null) => ({
  name: errorTypes.Forbidden,
  message,
});

export const NotFoundError = (message = "", error = null) => ({
  name: errorTypes.NotFound,
  message,
  error,
});

export const ValidationError = (message = "", error = null) => ({
  name: errorTypes.Validation,
  message,
});

export const UnathorizedError = (message = "", error = null) => ({
  name: errorTypes.Unathorized,
  message,
});
