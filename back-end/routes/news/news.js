import express from "express";
const router = express.Router();
const baseUrl = "https://newsapi.org/v2/top-headlines";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.log(
    "Please set the API_KEY environment variable with a valid newsapi.org apiKey and restart the server!"
  );
  process.exit(0);
}

function addApiKey(queryObject) {
  return { ...queryObject, apiKey: apiKey };
}

export function createUrlFromQueryObject(queryObjectWithApiKey) {
  const queryString = new URLSearchParams(queryObjectWithApiKey).toString();
  const url = baseUrl + "?" + queryString;
  return url;
}

export async function fetchData(url) {
  let data = null;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

router.get("/", async (req, res) => {
  let fixedQueryObject = {
    country: "us",
    q: "news",
  };
  let queryObject = addApiKey(fixedQueryObject);

  const url = createUrlFromQueryObject(queryObject);
  const newsArticles = await fetchData(url);

  res.send(newsArticles);
});

router.post("/", async (req, res) => {
  const query = req.body;
  let queryObject = addApiKey(fixedQueryObject);

  let url = createUrlFromQueryObject(queryObject);
  let newsArticles = await fetchData(url);

  res.send(newsArticles);
});

export default router;
