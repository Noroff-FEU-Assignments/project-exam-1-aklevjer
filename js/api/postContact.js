import * as constants from "../constants/index.js";

export async function postContactForm(contactData) {
  const response = await fetch(constants.apiUrlCF7, {
    method: "POST",
    body: contactData,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Failed to post the contact form");
}
