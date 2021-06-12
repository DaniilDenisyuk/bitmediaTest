import Joi from "joi";

export const userStatsSchema = Joi.object({
  id: Joi.number().min(1),
  from: Joi.date(),
  to: Joi.date().greater(Joi.ref("from")),
});

export default userStatsSchema;
