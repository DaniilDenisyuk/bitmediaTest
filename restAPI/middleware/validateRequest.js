import { ValidationError } from "../common/errorTypes.js";

export const validateRequest = (schema, prop = "body") => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  return (req, res, next) => {
    const { error, value } = schema.validate(req[prop], options);
    if (error) {
      next(
        ValidationError(`${error.details.map((x) => x.message).join(", ")}`)
      );
    } else {
      req[prop] = value;
      next();
    }
  };
};
