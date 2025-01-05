import { useEffect, type FC } from 'react';

import { authApi, useAppDispatch } from '../@redux/index';
import { AppRouter } from '../router';

import { Container } from 'components';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.refresh());
  }, [dispatch]);

  return (
    <>
      <Container>
        <AppRouter />
      </Container>
    </>
  );
};
export default App;
