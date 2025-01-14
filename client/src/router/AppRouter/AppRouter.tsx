import { Route, Routes } from 'react-router';

import { AuthPage, MainPage } from '@pages';
import { AuthRoute, ProtectedRoute, Redirect } from '@router';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route path="*" element={<Redirect />} />
    </Routes>
  );
}
