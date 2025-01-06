import { StrictMode, useEffect, type FC } from 'react';

import { authApi, useAppDispatch } from '../@redux/index';
import { AppRouter } from '../router';

import { AnimatedWrapper, Container } from 'components';
import { AnimatePresence } from 'motion/react';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.refresh());
  });

  return (
    <StrictMode>
      <Container>
        <AnimatePresence>
          <AnimatedWrapper animationKey={'router'}>
            <AppRouter />
          </AnimatedWrapper>
        </AnimatePresence>
      </Container>
    </StrictMode>
  );
};
export default App;
