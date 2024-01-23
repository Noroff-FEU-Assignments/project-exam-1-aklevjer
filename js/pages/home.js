import * as api from "../api/index.js";
import * as constants from "../constants/index.js";

export async function homePage() {
  try {
    const latestPosts = await api.fetchPosts(constants.apiParamsLatest);

    console.log(latestPosts);
  } catch (error) {
    console.error(error);
  }
}
