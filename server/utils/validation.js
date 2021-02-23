const Joi = require("joi");

const mentionValidation = (data) => {
  //Validation schema
  const schema = Joi.object({
    title: Joi.string().min(6).required(),
    content: Joi.string().min(10).required(),
    platform: Joi.string().required(),
    date: Joi.date().required(),
    popularity: Joi.optional(),
    image: Joi.optional(),
    url: Joi.string().required()
  });
  return schema.validate(data);
};
module.exports = { mentionValidation };
