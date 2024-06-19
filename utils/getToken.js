import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();

export const getToken = async () => {
  const redisToken = "access_token";
  try {
    console.log("Getting token")
    const cachedToken = await redis?.get(redisToken);

    if (cachedToken) {
      console.log("This token is cached",cachedToken);
      return cachedToken;
    }
    console.log("Getting a new token");
    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/token`
    );
    const data = await response.json();
    console.log("This is my response data", data);
    const newToken = data.access_token;

    if (newToken) {
      console.log("Got this new token", newToken);
      await redis.set(redisToken, newToken, { ex: 86400 });
      return newToken;
    } else {
      throw new Error("Failed to fetch new token");
    }
  } catch (error) {
    throw error;
  }
};

export const getRoleToken = async () => {
  const redisToken = "access_role_token";
  try {
    const cachedToken = await redis?.get(redisToken);
    if (cachedToken) {
      return cachedToken;
    }

    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/roletoken`
    );
    const data = await response.json();
    const newToken = data.access_token;
    if (newToken) {
      await redis.set(redisToken, newToken, { ex: 86400 });
      return newToken;
    } else {
      throw new Error("Failed to fetch new token");
    }
  } catch (error) {
    throw error;
  }
};
