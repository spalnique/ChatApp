import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { UserInputStyled } from '@styled';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  register: UseFormRegister<T>;
};

const UserInput = <T extends FieldValues>({
  name,
  register,
  ...props
}: Props<T>): JSX.Element => {
  return <UserInputStyled {...register(name)} {...props} />;
};

export default UserInput;
