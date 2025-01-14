import { useSearchParams } from 'react-router';

import {
  AnimatedWrapper,
  Container,
  LoginForm,
  RegisterForm,
} from '@components';

export default function AuthPage() {
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get('login') === '';
  const isRegister = searchParams.get('register') === '';

  return (
    <AnimatedWrapper animationKey={'authPage'}>
      <Container>
        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </Container>
    </AnimatedWrapper>
  );
}
