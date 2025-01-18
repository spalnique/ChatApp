import { Logo } from '@components';

import DropdownMenu from '../DropdownMenu/DropdownMenu.tsx';

export default function AppBar() {
  return (
    <>
      <Logo className="!size-10 justify-self-center" />
      <DropdownMenu />
    </>
  );
}
