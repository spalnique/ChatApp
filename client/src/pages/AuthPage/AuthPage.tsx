import { Navigate, useSearchParams } from 'react-router';
import type { FC } from 'react';

import { Container, LoginForm, RegisterForm } from '@components';

const AuthPage: FC = () => {
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('login') === '';
  const isRegister = searchParams.get('register') === '';

  const shouldRedirect = !isLogin && !isRegister;

  if (shouldRedirect)
    return searchParams.toString().startsWith('reg') ||
      searchParams.toString().startsWith('sig') ? (
      <Navigate to="?register" />
    ) : (
      <Navigate to="?login" />
    );

  return (
    <Container>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Container>
  );
};
export default AuthPage;
