import { Redis } from "@upstash/redis";

const hasRedisEnv =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = hasRedisEnv ? Redis.fromEnv() : null;

const safeRedisGet = async (key) => {
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
};

const safeRedisSet = async (key, value, ex) => {
  if (!redis) return;
  try {
    await redis.set(key, value, { ex });
  } catch {
    // noop: token fetch should work even without Redis cache
  }
};

export const getToken = async () => {
  const redisToken = "access_token";
  try {
    const cachedToken = await safeRedisGet(redisToken);

    if (cachedToken) {
      return cachedToken;
    }
    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/token`
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const newToken = data.access_token;

    if (newToken) {
      await safeRedisSet(redisToken, newToken, 86400);
      return newToken;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getRoleToken = async () => {
  const redisToken = "access_role_token";
  try {
    const cachedToken = await safeRedisGet(redisToken);
    if (cachedToken) {
      return cachedToken;
    }

    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/roletoken`
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    const newToken = data.access_token;
    if (newToken) {
      await safeRedisSet(redisToken, newToken, 86400);
      return newToken;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
