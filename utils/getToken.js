import Redis from "ioredis";
const redisClient = new Redis(process.env.REDIS_URL);
export const getToken = async () => {
  const redisToken = "access_token";
  try {
    // Check if the token is cached in Redis
    const cachedToken = await redisClient.get(redisToken);

    if (cachedToken) {
      // If the token is in the cache, return it
      return cachedToken;
    }

    // If the token is not in the cache or has expired, fetch a new one

    // Get the access token from the response
    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/token`
    );
    const data = await response.json();
    const newToken = data.access_token;

    // Store the new token in Redis with an expiration time of 24 hours
    await redisClient.set(redisToken, newToken, "EX", 86400);

    // Return the new token
    return newToken;
  } catch (error) {
    throw error;
  }
};
