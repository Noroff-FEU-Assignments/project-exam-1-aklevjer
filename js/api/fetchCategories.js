import * as constants from "../constants/index.js";

export async function fetchCategories() {
  const response = await fetch(constants.apiBaseUrl + constants.apiEndpointCategories);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to fetch a list of categories");
}
