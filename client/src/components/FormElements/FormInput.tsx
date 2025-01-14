import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import {
  ErrorStyled,
  InputStyled,
  InputWrapperStyled,
  LabelStyled,
} from '@styled';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: Path<T>;
  error?: FieldError['message'];
  register: UseFormRegister<T>;
};

export default function FormInput<T extends FieldValues>({
  label,
  name,
  error,
  register,
  ...props
}: Props<T>) {
  const id = useId();

  return (
    <InputWrapperStyled>
      {label && (
        <LabelStyled htmlFor={id} $error={error}>
          {label}
        </LabelStyled>
      )}
      <InputStyled id={id} $error={error} {...register(name)} {...props} />
      {error && (
        <ErrorStyled className="absolute -bottom-4 left-0">{error}</ErrorStyled>
      )}
    </InputWrapperStyled>
  );
}
