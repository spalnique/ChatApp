import type { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto flex h-[100vh] max-w-[1280px] items-center justify-center bg-slate-100">
      {children}
    </div>
  );
};
export default Container;
