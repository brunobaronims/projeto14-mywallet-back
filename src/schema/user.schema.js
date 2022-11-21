import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string()
  .required()
  .trim()
  .messages({
    'string.base': 'Nome inválido',
    'any.required': 'Insira um nome'
  }),
  email: Joi.string()
  .required()
  .trim()
  .email({ tlds: { allow: false }})
  .messages({
    'any.required': 'Insira um email',
    'string.email': 'Email inválido'
  }),
  password: Joi.string()
  .required()
  .trim()
  .alphanum()
  .min(6)
  .messages({
    'string.base': 'Senha inválida',
    'any.required': 'Insira uma senha',
    'string.alphanum': 'Senha deve conter apenas letras e números',
    'string.min': 'Senha deve conter pelo menos 6 caracteres'
  }),
  passwordConfirm: Joi.any()
  .valid(Joi.ref('password'))
  .required()
  .messages({
    'any.only': 'Senhas devem ser iguais'
  })
})