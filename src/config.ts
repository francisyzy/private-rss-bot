import * as dotenv from "dotenv";

dotenv.config();

const config = {
  API_TOKEN: process.env.API_TOKEN,
  URL: process.env.URL,
  NOTIFY_IDS: process.env.NOTIFY_IDS,
};

export default config;
