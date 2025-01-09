import { AnimatePresence } from 'motion/react';
import { StrictMode } from 'react';
import type { FC } from 'react';

import { AnimatedWrapper } from '@components';
import { AppRouter } from '@router';

const App: FC = () => {
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
