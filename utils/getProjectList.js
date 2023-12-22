// api.js
export const getProjectList = async (user_id) => {
    try {
      const response = await fetch(`/api/manageProjects?user_id=${user_id}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.projects) {
          return responseData.projects;
        }
      } else {
        console.error('API request failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
    return null;
  };
  