import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { ErrorStyled, InputStyled, LabelStyled } from '@styled';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: Path<T>;
  error?: FieldError['message'];
  $fixed?: boolean;
  register: UseFormRegister<T>;
};

const FormCheckbox = <T extends FieldValues>({
  label,
  name,
  error,
  $fixed,
  register,
  ...props
}: Props<T>) => {
  const id = useId();

  return (
    <div className="relative flex items-center justify-center gap-3">
      <InputStyled
        id={id}
        $error={error}
        {...register(name)}
        style={{ width: 14, height: 14 }}
        {...props}
      />
      <LabelStyled
        htmlFor={id}
        $error={error}
        children={label}
        style={{ fontSize: 14 }}
        $fixed={$fixed}
      />

      {error && (
        <ErrorStyled className="absolute -bottom-4 left-0" children={error} />
      )}
    </div>
  );
};

export default FormCheckbox;
