export const getUserRole = async () => {
  try {
    const response = await fetch(`/api/manageRole`, {
      method: "GET",
    });

    if (!response.ok) return [];

    const responseData = await response.json();
    if (!Array.isArray(responseData)) return [];

    return responseData.map((rsp) => rsp.name);
  } catch {
    return [];
  }
};
