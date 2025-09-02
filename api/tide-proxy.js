// api/tide-proxy.js
import fetch from 'node-fetch';

export default async function handler(request, response) {
  try {
    const originalUrl = request.query.url;

    if (!originalUrl) {
      return response.status(400).json({ error: "URL parameter is missing." });
    }

    const apiResponse = await fetch(originalUrl);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      return response.status(apiResponse.status).json({
        error: `API returned an error: ${apiResponse.statusText}`,
        details: errorText
      });
    }

    const data = await apiResponse.json();
    response.status(200).json(data);

  } catch (e) {
    console.error(e);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
