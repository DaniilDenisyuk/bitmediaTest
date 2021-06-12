import Joi from "joi";

export const userStatsSchema = Joi.object({
  id: Joi.number().min(1).required(),
});

export default userStatsSchema;
