import Joi from "joi";

export const transactionSchema = Joi.object({
  amount: Joi.number()
  .positive()
  .required()
  .messages({
    'number.base': 'Insira um valor numérico',
    'any.required': 'Insira um valor',
    'number.positive': 'Valor deve ser maior que 0'
  }),
  description: Joi.string()
  .trim()
  .alphanum()
  .required()
  .messages({
    'any.required': 'Insira uma descrição'
  })
})