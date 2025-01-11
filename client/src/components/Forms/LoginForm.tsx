import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { LoginCredentials } from '@types';

import { AnimatedWrapper, Button, Form, FormInput } from '@components';
import { loginSchema } from '@constant';
import { authApi, useAppDispatch } from '@reduxtoolkit';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    dispatch(authApi.login(data));
  };

  return (
    <AnimatedWrapper animationKey={'login'}>
      <Form onSubmit={handleSubmit(onSubmit)} $direction="column" logo>
        <FormInput<LoginCredentials>
          name="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          register={register}
        />
        <FormInput<LoginCredentials>
          name="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          register={register}
          className="mb-3"
        />

        <Button label="Login" type="submit" $centered />
      </Form>
      <NavLink className="mx-auto mt-6 block w-fit text-sm" to={'?register'}>
        Go to registration
      </NavLink>
    </AnimatedWrapper>
  );
};

export default LoginForm;
