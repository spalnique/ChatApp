import { ENV_VARS } from '@constants';
import { connectToDB } from '@db';
import { env } from '@helpers';

import app from './app.ts';

(async () => {
  const PORT = env(ENV_VARS.PORT, 3000);

  await connectToDB();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
})();
