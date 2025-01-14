import 'module-alias/register';
import 'tsconfig-paths/register';

import { ENV_VARS } from '@constants';
import { connectToDB } from '@db';
import { env } from '@helpers';

import server from './socket';

(async () => {
  const PORT = env(ENV_VARS.PORT, 3000);

  await connectToDB();

  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
})();
