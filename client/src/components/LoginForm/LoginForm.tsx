import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { authApi, useAppDispatch } from '../../@redux/index';

import type { LoginCredentials } from 'types';

type LoginFormData = LoginCredentials;

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) =>
    dispatch(authApi.login(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input {...register('email', { required: true })} type="email" />

      <label>Password:</label>
      <input {...register('password', { required: true })} type="password" />

      <input type="submit" />
    </form>
  );
};

export default LoginForm;
