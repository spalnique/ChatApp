import 'module-alias/register';

import { ENV_VARS } from '@constants';
import { connectToDB } from '@db';
import { env } from '@helpers';

// import app from './app';
import server from './socket';

(async () => {
  const PORT = env(ENV_VARS.PORT, 3000);
  // const SOCKET_PORT = env(ENV_VARS.SOCKET_PORT, 4004);

  await connectToDB();

  // app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
})();
