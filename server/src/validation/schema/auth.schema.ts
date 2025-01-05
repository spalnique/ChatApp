import joi from 'joi';

import { RegisterSchema } from '../../@types/validation.type';

export const registerUserSchema = joi.object<RegisterSchema>({
  displayName: joi.string().min(3).max(30).optional().messages({
    'string.min': `"Public name" must have at least {#limit} symbols`,
    'string.max': `"Public name" must have at most {#limit} symbols`,
  }),
  username: joi.string().min(6).max(24).required(),
  email: joi
    .string()
    .email()
    .pattern(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/
    )
    .required()
    .messages({ 'string.pattern.base': 'Mordor emails are not accepted.' }),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one small and one capital letters.',
    }),
  isAdult: joi.boolean().valid(true).required(),
});

export const loginUserSchema = joi.object({
  email: joi
    .string()
    .email()
    .pattern(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/
    )
    .required()
    .messages({ 'string.pattern.base': 'Mordor emails are not accepted.' }),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one small and one capital letters.',
    }),
});
