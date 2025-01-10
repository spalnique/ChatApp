import { AnimatePresence } from 'motion/react';

// import { StrictMode } from 'react';

import { AnimatedWrapper } from '@components';
import { SocketProvider } from '@context';
import { AppRouter } from '@router';

const App = () => {
  return (
    // <StrictMode>
    <SocketProvider>
      <AnimatePresence>
        <AnimatedWrapper animationKey={'router'}>
          <AppRouter />
        </AnimatedWrapper>
      </AnimatePresence>
    </SocketProvider>
    // </StrictMode>
  );
};
export default App;
