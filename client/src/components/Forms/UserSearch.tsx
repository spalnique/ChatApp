import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { Username } from '@types';

import { Button, FormInput } from '@components';
import { userSearchSchema } from '@constant';
import { useWebsockets } from '@hooks';
import { userApi } from '@reduxtoolkit';
import { UserSearchStyled } from '@styled';

const UserSearch = () => {
  const ws = useWebsockets();

  const [contactId, setContactId] = useState<string>('');

  const {
    watch,
    trigger,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Username>({
    defaultValues: { username: '' },
    resolver: yupResolver(userSearchSchema),
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  async function onSubmit({ username }: Username) {
    if (!isDirty) return;

    try {
      const response = await userApi.findUser(username);
      setContactId(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError('username', { message: error.message });
      }
    }
  }

  function asyncHandleChange() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const value = watch('username');

      if (!value) return clearErrors('username');
      if (value) trigger('username');

      try {
        setContactId('');
        const response = await userApi.findUser(value);
        setContactId(response);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError('username', { message: error.response?.data.message });
        }
      }
    }, 500);
  }

  function handleBlur() {
    clearErrors('username');
  }

  function handleCreateChat() {
    if (watch('username') && isDirty) {
      ws.createChat(contactId);
    }
  }

  return (
    <UserSearchStyled
      onSubmit={handleSubmit(onSubmit)}
      onChange={asyncHandleChange}
      onBlur={handleBlur}
    >
      <FormInput<Username>
        label="Username"
        name="username"
        error={errors.username?.message}
        register={register}
        autoComplete="off"
      />
      <Button
        type="button"
        label="Create"
        onClick={handleCreateChat}
        disabled={!ws.isConnected || !contactId || !watch('username')}
        $centered
      />
    </UserSearchStyled>
  );
};
export default UserSearch;
