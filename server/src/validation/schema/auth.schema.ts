import * as yup from 'yup';

export const registerUserSchema = yup.object({
  displayName: yup
    .string()
    .min(3, `"Public name" must have at least ${3} symbols`)
    .max(30, `"Public name" must have at most ${30} symbols`)
    .optional(),
  username: yup
    .string()
    .min(6, `"Username" must have at least ${6} symbols`)
    .max(24, `"Username" must have at most ${24} symbols`)
    .required('Username is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
      'Mordor emails are not accepted.'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/,
      'Password must contain at least one small and one capital letters.'
    )
    .required('Password is required'),
  isAdult: yup
    .boolean()
    .oneOf([true], 'You must be an adult to register')
    .required('isAdult is required'),
});

export const loginUserSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
      'Mordor emails are not accepted.'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).+$/,
      'Password must contain at least one small and one capital letters.'
    )
    .required('Password is required'),
});
