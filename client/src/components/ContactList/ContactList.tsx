import { UserSearch } from '@components';

export default function ContactList() {
  return (
    <>
      <UserSearch />
      <ul className="flex w-full grow flex-col items-center justify-center">
        Contacts
      </ul>
    </>
  );
}
