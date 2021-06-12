import Joi from "joi";

export const cursorSchema = Joi.object({
  startId: Joi.number().min(1),
  amount: Joi.number().min(1).max(1000),
  direction: Joi.string().valid("forward", "backward"),
});

export default cursorSchema;
