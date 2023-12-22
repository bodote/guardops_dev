export const getToken = async () => {
  try {
    const response = await fetch(
      `${process.env.AUTH0_BASE_URL}/api/auth/token`
    );
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw error;
  }
};
