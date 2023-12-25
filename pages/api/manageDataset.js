import { getToken } from "@/utils/getToken";

export default async function handler(req, res) {
    let Url = null;
    let queryParams = null;
    let urlWithParams = null;
    let bodyData = null;
    const baseUrl = process.env.BackendBaseUrl;

    const { method } = req;

    const token = await getToken();

    switch (method) {
        case "GET":
            Url = `${baseUrl}api/get_datasets`;
            queryParams = new URLSearchParams({
                user_id: req.query.user_id,
            });
            urlWithParams = `${Url}?${queryParams}`;
            
            try {
                const response = await fetch(urlWithParams, {
                    method: "GET",
                    headers: new Headers({
                        authorization: `Bearer ${token}`,
                    }),
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
            Url = `${baseUrl}api/create_dataset`;
            queryParams = new URLSearchParams({
                user_id: bodyData.user_id,
                dataset_name: bodyData.dataset_name,
                dataset_description: bodyData.dataset_description,
            });
            urlWithParams = `${Url}?${queryParams}`;
            try {
                const response = await fetch(urlWithParams, {
                    method: "POST",
                    headers: new Headers({
                        authorization: `Bearer ${token}`,
                    }),
                });

                const data = await response.json();
                res.status(response.status).json(data);
            } catch (error) {
                console.error("Error during API request:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            break;
        case "PATCH":
            bodyData = JSON.parse(req.body);
            Url = `${baseUrl}api/update_dataset`;
            queryParams = new URLSearchParams({
                user_id: bodyData.user_id,
                dataset_id: bodyData.dataset_id,
                dataset_name: bodyData.dataset_name,
                dataset_description: bodyData.dataset_description
            });

            urlWithParams = `${Url}?${queryParams}`;
            try {
                const response = await fetch(urlWithParams, {
                    method: "DELETE",
                    headers: new Headers({
                        authorization: `Bearer ${token}`,
                    }),
                });

                const data = await response.json();
                res.status(response.status).json(data);
            } catch (error) {
                console.error("Error during API request:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            break;
        case "DELETE":
            bodyData = JSON.parse(req.body);
            Url = `${baseUrl}api/delete_dataset`;
            queryParams = new URLSearchParams({
                user_id: bodyData.user_id,
                dataset_id: bodyData.dataset_id,
            });

            urlWithParams = `${Url}?${queryParams}`;
            try {
                const response = await fetch(urlWithParams, {
                    method: "DELETE",
                    headers: new Headers({
                        authorization: `Bearer ${token}`,
                    }),
                });

                const data = await response.json();
                res.status(response.status).json(data);
            } catch (error) {
                console.error("Error during API request:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
            break;
    }
}
