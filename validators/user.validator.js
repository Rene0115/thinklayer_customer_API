import Joi from 'joi';

class UserValidator {
  validateUserSchema = Joi.object().keys({
    email: Joi
      .string()
      .email()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required(),
    password: Joi
      .string()
      .required(),
    phone: Joi
      .number()
      .required(),
    name: Joi
      .string()
      .required()
  });

  deleteUserSchema = Joi.object({
    id: Joi.string().required()
  });

  userLoginSchema = Joi.object().keys({
    email: Joi
      .string()
      .email()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required(),
    password: Joi
      .string()
      .required()
  });
}
export default new UserValidator();
