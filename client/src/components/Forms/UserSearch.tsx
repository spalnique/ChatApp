import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FormEventHandler, MouseEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import type { Username } from '@types';

import { Button, FormInput } from '@components';
import { userSearchSchema } from '@constant';
import { useSocketContext } from '@hooks';
import { userApi } from '@reduxtoolkit';
import { UserSearchStyled } from '@styled';

const UserSearch = () => {
  const socket = useSocketContext();
  if (socket?.disconnected) socket.connect();

  const [contactId, setContactId] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    setError,
    formState: { errors, isDirty },
  } = useForm<Username>({
    defaultValues: { username: '' },
    resolver: yupResolver(userSearchSchema),
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  const onSubmit: SubmitHandler<Username> = async ({ username }) => {
    if (!isDirty) return;

    try {
      const response = await userApi.findUser(username);
      setContactId(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError('username', { message: error.message });
      }
    }
  };

  const asyncHandleChange: FormEventHandler<HTMLFormElement> = () => {
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
  };

  const handleBlur: FormEventHandler<HTMLFormElement> = () => {
    clearErrors('username');
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    const value = watch('username');
    if (value && isDirty) {
      socket?.emit('chat:create', { participants: [contactId] });
    }
  };

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
        onClick={handleClick}
        disabled={!socket || !contactId || !watch('username')}
        $size="fullwidth"
        $centered
      />
    </UserSearchStyled>
  );
};
export default UserSearch;
