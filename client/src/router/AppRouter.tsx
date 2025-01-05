import { type FC } from 'react';
import { Route, Routes } from 'react-router';

import { AuthRoute, ProtectedRoute } from './index';
import { MainPage, AuthPage } from 'pages';
import { Redirect } from 'components';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route element={<AuthRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="main" element={<MainPage />} />
      </Route>
      <Route path="*" element={<Redirect />} />
    </Routes>
  );
};
export default AppRouter;
