import type { LoginCredentials, RegisterCredentials } from '@types';
import { boolean, object, string, type ObjectSchema } from 'yup';

export const formType = { register: 'register', login: 'login' };

export const loginSchema: ObjectSchema<LoginCredentials> = object({
  email: string()
    .email()
    .matches(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
      { message: 'Pigdogs shall not pass!' }
    )
    .required('This field is required'),
  password: string().required('This field is required'),
});

export const registerSchema: ObjectSchema<
  RegisterCredentials & { confirm?: string }
> = object({
  displayName: string(),
  username: string().required('This field is required'),
  email: string()
    .email()
    .matches(
      /^[a-z._0-9]+@(?!yandex|mail|bk|list|tut|inbox|rambler)[a-z]+\.(?!ru$|by$)[a-z]{2,}$/,
      { message: 'Pigdogs shall not pass!' }
    )
    .required('This field is required'),
  password: string().required('This field is required'),
  confirm: string().required('This field is required'),
  isAdult: boolean().required('This field is required'),
});
