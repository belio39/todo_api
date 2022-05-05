import Joi from "joi";

export const Registerschema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(0).max(50).required(),
  date: Joi.string().required(),
});
