import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

const redis = new Redis(process.env.REDIS_URL as string);

export { redis };
