import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { selectUser, useAppSelector } from '../../redux';

export default function Redirect() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const knownUser = localStorage.getItem('user');

  useEffect(() => {
    if (user) navigate('/main', { replace: true });
    if (knownUser) navigate('/auth?login', { replace: true });
    if (!knownUser) navigate('/auth?register', { replace: true });
  }, []);

  return null;
}
