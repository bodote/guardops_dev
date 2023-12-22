import { useUser } from "@auth0/nextjs-auth0/client";
export const getUserInfo = async () => {
  const { user } = useUser();
  if (user) {
    return user;
  }
};