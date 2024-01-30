import * as utils from "../../../utils/index.js";

export function renderCategories(categories, categorySelect) {
  const filteredCategories = categories.filter((category) => category.name.toLowerCase() !== "uncategorized");

  filteredCategories.forEach((category) => {
    const categoryOption = utils.createHTMLElement("option", null, utils.getParsedText(category.name));
    categoryOption.value = category.slug;

    categorySelect.append(categoryOption);
  });
}
