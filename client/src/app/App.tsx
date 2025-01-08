import { AnimatePresence } from 'motion/react';
import { StrictMode, useEffect } from 'react';
import type { FC } from 'react';

import { AnimatedWrapper } from '@components';
import { authApi, useAppDispatch } from '@reduxtoolkit';
import { AppRouter } from '@router';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.refresh());
  });

  return (
    <StrictMode>
      <AnimatePresence>
        <AnimatedWrapper animationKey={'router'}>
          <AppRouter />
        </AnimatedWrapper>
      </AnimatePresence>
    </StrictMode>
  );
};
export default App;
