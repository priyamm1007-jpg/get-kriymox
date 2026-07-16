import axios from "axios";

const API =
  "https://kriymox-api.onrender.com/api/inspect";

export async function inspectWebsite(url) {
  try {
    const { data } = await axios.post(API, {
      url,
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Inspection failed"
    );
  }
}
