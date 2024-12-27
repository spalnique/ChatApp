import app from './app.ts';
import env from './helper/env.ts';
import connectToDB from './db/connectToDB.ts';
import { ENV } from './constant/index';

(async () => {
  const PORT = env(ENV.PORT, 3000);

  await connectToDB();

  app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
})();
