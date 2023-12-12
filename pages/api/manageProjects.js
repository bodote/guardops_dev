export default async function handler(req, res) {
  const apiToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9JeVp6R1FQbmNXQ3NvZ3BDRFcxUiJ9.eyJpc3MiOiJodHRwczovL2NvYWkuZXUuYXV0aDAuY29tLyIsInN1YiI6IjdOMk9Rc1oyS3ZBaE56RFVYNm51MWYxSDg3eWw5dnlGQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2xtMy5ocy1hbnNiYWNoLmRlL3RyYWNpbmcvIiwiaWF0IjoxNzAyMzYwNzY0LCJleHAiOjE3MDI0NDcxNjQsImF6cCI6IjdOMk9Rc1oyS3ZBaE56RFVYNm51MWYxSDg3eWw5dnlGIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.nR1gOpDgGSsOpRQrfTSAxRcrDoUCr0SnaupvYV9Q2_P1G-21CNZuQzVUv5qIUvxwP2TAeVm2KeAI6I-hBf9coFo6SBr9AxInrxrAbH_vwZryIdYG92KC3DB8cb_mZquO3e6_quD2r2Q2rrczr_0SgJ5J0l-wvziAPLyvddv8Glsvb5W7WleO-jJPpN9l3_MEKRKH3-m2Xs6eDZpDJhktXIsWni2OBYfWCoyB-1l8RphtUDsXl9dVfpxBPXSVMDX8fKfApFG3kfuVRXySoxA2JfR7VrF6xBEvPJdXRHFEY6gi0z5qqZ2DRk9d6CTKUl0xpDKupkfJWnAH0g5ThFIhQg";
  let Url = null;
  let queryParams = null;
  let urlWithParams = null;
  let bodyData = null;
  const baseUrl = process.env.BackendBaseUrl;

  const { method } = req;
  const headers = {
    Authorization: `Bearer ${apiToken}`,
  };
  switch (method) {
    case "GET":
      Url = `${baseUrl}api/get_projects`;
      queryParams = new URLSearchParams({
        user_id: req.query.user_id,
      });
      urlWithParams = `${Url}?${queryParams}`;
      try {
        const response = await fetch(urlWithParams, {
          method: "GET",
          headers: headers,
        });

        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error during API request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case "POST":
      bodyData = JSON.parse(req.body);
      Url = `${baseUrl}api/create_project`;
      queryParams = new URLSearchParams({
        user_id: bodyData.user_id,
        project_name: bodyData.project_name,
        project_description: bodyData.project_description,
        project_retention:bodyData.project_retention,
        project_tags: bodyData.project_tags.join(","),
      });
      urlWithParams = `${Url}?${queryParams}`;
      try {
        const response = await fetch(urlWithParams, {
          method: "POST",
          headers: headers,
        });

        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error during API request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    case "DELETE":
      bodyData = JSON.parse(req.body);
      Url = `${baseUrl}api/delete_project`;
      queryParams = new URLSearchParams({
        user_id: bodyData.user_id,
        project_id: bodyData.project_id,
        cascade: bodyData.cascade,
      });

      urlWithParams = `${Url}?${queryParams}`;
      try {
        const response = await fetch(urlWithParams, {
          method: "DELETE",
          headers: headers,
        });

        const data = await response.json();
        res.status(response.status).json(data);
      } catch (error) {
        console.error("Error during API request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  }
}
