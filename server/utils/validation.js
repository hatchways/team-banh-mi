const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  platform: Joi.string().required(),
  date: Joi.date().required(),
  popularity: Joi.optional(),
  image: Joi.optional(),
  url: Joi.string().required(),
});

const mentionValidation = (data) => {
  return schema.validate(data);
};

module.exports = { mentionValidation };
