import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { Container, LoginForm, RegisterForm } from '@components';

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('login') === '';
  const isRegister = searchParams.get('register') === '';
  const shouldRedirect = !isLogin && !isRegister;
  const knownUser = localStorage.getItem('user');

  useEffect(() => {
    if (shouldRedirect) {
      (() =>
        knownUser
          ? navigate('?login', { replace: true })
          : navigate('?register', { replace: true }))();
    }
  });

  return (
    <Container>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Container>
  );
}
