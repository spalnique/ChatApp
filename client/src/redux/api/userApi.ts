import { userEndpoint } from '@reduxtoolkit';

import instance from '../axios.ts';

const findUser = async (username: string) => {
  const {
    data: { data },
  } = await instance.get<{ data: string }>(userEndpoint.find(username));

  return data;
};

export const userApi = { findUser };
