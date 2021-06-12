import { errorTypes } from "../common/errorTypes.js";

export const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case errorTypes.Forbidden:
      return res.status(403).json({ message: "Forbidden" });
    case errorTypes.NotFound:
      return res.status(404).json({ message: "Not found" });
    case errorTypes.Validation:
      return res.status(400).json({ message: "Bad request" });
    case errorTypes.Unathorized:
      return res.status(401).json({ message: "Unathorized" });
    default:
      return res.status(500).json({ message: "Internal server error" });
  }
};
