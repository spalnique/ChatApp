import { ENV_VARS } from '@constants';
import { connectToDB } from '@db';
import { env } from '@helpers';

import app from './app.ts';
import httpServer from './socket.ts';

(async () => {
  const PORT = env(ENV_VARS.PORT, 3000);
  const SOCKET_PORT = env(ENV_VARS.SOCKET_PORT, 4004);

  await connectToDB();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

  httpServer.listen(SOCKET_PORT, () => {
    console.log(`HTTP server running on http://localhost:${SOCKET_PORT}`);
  });
})();
