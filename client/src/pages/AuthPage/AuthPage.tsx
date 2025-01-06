import type { FC } from 'react';

import { LoginForm, RegisterForm } from 'components';
import { Navigate, useSearchParams } from 'react-router';

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
    <div
      style={{
        width: '50vw',
        height: '100vh',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  );
};
export default AuthPage;
