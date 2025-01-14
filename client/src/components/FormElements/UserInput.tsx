import type { InputHTMLAttributes } from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { UserInputStyled } from '@styled';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  register: UseFormRegister<T>;
};

export default function UserInput<T extends FieldValues>({
  name,
  register,
  ...props
}: Props<T>) {
  return <UserInputStyled {...register(name)} {...props} />;
}
