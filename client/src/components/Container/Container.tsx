import type { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex h-[100vh] max-w-[1280px] items-center justify-center bg-slate-100">
      {children}
    </div>
  );
}
