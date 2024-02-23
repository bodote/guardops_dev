import Redis from "ioredis";
const redisClient = new Redis(process.env.REDIS_URL);
export const getToken = async () => {
  const redisToken = "access_token";
  try {
    const cachedToken = await redisClient?.get(redisToken);

    if (cachedToken) {
      return cachedToken;
    }

    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/token`
    );
    const data = await response.json();
    const newToken = data.access_token;

    if (newToken) {
      await redisClient.set(redisToken, newToken, "EX", 86400);
      return newToken;
    } else {
      throw new Error("Failed to fetch new token");
    }
  } catch (error) {
    throw error;
  }
};
