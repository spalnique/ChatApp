import { Route, Routes } from 'react-router';

import { Redirect } from '@components';
import { AuthPage, MainPage } from '@pages';
import { AuthRoute, ProtectedRoute } from '@router';

export default function AppRouter() {
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
}
