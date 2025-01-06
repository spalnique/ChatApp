import { useEffect, type FC } from 'react';

import { authApi, useAppDispatch } from '../@redux/index';
import { AppRouter } from '../router';

import { AnimatedWrapper, Container } from 'components';
import { AnimatePresence } from 'motion/react';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.refresh());
  }, [dispatch]);

  return (
    <>
      <Container>
        <AnimatePresence>
          <AnimatedWrapper animationKey={'router'}>
            <AppRouter />
          </AnimatedWrapper>
        </AnimatePresence>
      </Container>
    </>
  );
};
export default App;
