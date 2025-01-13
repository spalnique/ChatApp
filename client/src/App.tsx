import { AnimatePresence } from 'motion/react';
import { StrictMode } from 'react';

import { AnimatedWrapper } from '@components';
import { AppRouter } from '@router';

const App = () => {
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
