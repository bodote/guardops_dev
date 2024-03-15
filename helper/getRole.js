export const getUserRole = async () => {
  const response = await fetch(`/api/manageRole`, {
    method: "GET",
  });
  if (response.ok) {
    const responseData = await response.json();
    if (responseData) {
      return responseData.map((rsp) => rsp.name);
    }
  }
};
