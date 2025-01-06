import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router';

import { authApi, useAppDispatch } from '../../@redux';

import type { RegisterCredentials } from 'types';
import { AnimatedWrapper } from 'components';

type RegisterFormData = RegisterCredentials & { confirm?: string };

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    if (data.password !== data.confirm) {
      setError(
        'confirm',
        {
          message: 'Password and password confirmation should match.',
        },
        { shouldFocus: true }
      );
      return;
    }

    if (!data.isAdult) {
      setError('isAdult', {}, { shouldFocus: true });
      return;
    }

    delete data.confirm;

    dispatch(authApi.register(data as RegisterCredentials));
  };

  return (
    <AnimatedWrapper animationKey={'register'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Display name:</label>
        <input {...register('displayName')} type="text" />

        <label>Username:</label>
        <input {...register('username')} type="text" />

        <label>Email:</label>
        <input {...register('email')} type="email" />

        <label>Password:</label>
        <input {...register('password')} type="password" />

        <label>Confirm password:</label>
        <input {...register('confirm')} type="password" />
        {errors.confirm && <span>{errors.confirm.message}</span>}

        <label>
          Confirm you are at least 18 years old{' '}
          <input
            {...register('isAdult')}
            defaultChecked={false}
            type="checkbox"
          />
        </label>

        <input type="submit" />

        <span>Already registered?</span>
        <NavLink to={'?login'}>Go to login</NavLink>
      </form>
    </AnimatedWrapper>
  );
};

export default RegisterForm;
