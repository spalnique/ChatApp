import mongoose from 'mongoose';

import { ENV_VARS } from '@constants';
import { env } from '@helpers';

const connectToDB = async () => {
  const DB_USER = env(ENV_VARS.DB_USER);
  const DB_PWD = env(ENV_VARS.DB_PWD);
  const DB_URL = env(ENV_VARS.DB_URL);
  const DB_NAME = env(ENV_VARS.DB_NAME);

  const connection_uri = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_URL}/${DB_NAME}`;

  try {
    if (mongoose.connection.readyState !== 0) return;
    await mongoose.connect(connection_uri);
    console.log('Connected to the database');
  } catch (e) {
    console.error(e);
  } finally {
    return mongoose.connection.readyState;
  }
};

export default connectToDB;
