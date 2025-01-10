import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { RegisterCredentials } from '@types';

import {
  AnimatedWrapper,
  Button,
  Form,
  FormCheckbox,
  FormInput,
} from '@components';
import { registerSchema } from '@constant';
import { authApi, useAppDispatch } from '@reduxtoolkit';

type RegisterFormData = RegisterCredentials & { confirm?: string };

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({ resolver: yupResolver(registerSchema) });

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
      <Form onSubmit={handleSubmit(onSubmit)} logo clickable>
        <FormInput<RegisterFormData>
          name="displayName"
          label="Display name"
          type="text"
          error={errors.displayName?.message}
          register={register}
        />
        <FormInput<RegisterFormData>
          name="username"
          label="Username"
          type="text"
          error={errors.username?.message}
          register={register}
        />
        <FormInput<RegisterFormData>
          name="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          register={register}
        />
        <FormInput<RegisterFormData>
          name="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          register={register}
        />
        <FormInput<RegisterFormData>
          name="confirm"
          label="Confirm password"
          type="password"
          error={errors.confirm?.message}
          register={register}
        />
        <FormCheckbox<RegisterFormData>
          name="isAdult"
          label="Confirm you are at least 18 years old"
          type="checkbox"
          error={errors.isAdult?.message}
          register={register}
          $fixed
        />

        <Button
          className="mt-3"
          label="Register"
          type="submit"
          $size="fullwidth"
          $centered
        />
      </Form>
      <NavLink className="mx-auto mt-6 block w-fit text-sm" to={'?login'}>
        Go to login
      </NavLink>
    </AnimatedWrapper>
  );
};

export default RegisterForm;
