import * as constants from "../constants/index.js";

export async function fetchCategories() {
  const response = await fetch(constants.apiUrlCategories);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to fetch a list of categories");
}
