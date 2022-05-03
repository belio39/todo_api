import Joi from "joi";

export const userschema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(50).max(100).required(),
  date: Joi.string().required(),
});
