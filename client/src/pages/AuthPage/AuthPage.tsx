import type { FC } from 'react';

import { LoginForm, RegisterForm } from 'components';
import { Navigate, NavLink, useSearchParams } from 'react-router';

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
      {isLogin && (
        <>
          <LoginForm />
          <span>Not registered yet?</span>
          <NavLink to={'?register'}>Go to registration</NavLink>
        </>
      )}
      {isRegister && (
        <>
          <RegisterForm />
          <span>Already registered?</span>
          <NavLink to={'?login'}>Go to login</NavLink>
        </>
      )}
    </div>
  );
};
export default AuthPage;
