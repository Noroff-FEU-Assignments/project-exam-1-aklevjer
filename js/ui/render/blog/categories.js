import * as utils from "../../../utils/index.js";

function filterOutUncategorized(categories) {
  return categories.filter((category) => {
    const parsedCategory = utils.getParsedText(category.name);
    return parsedCategory.toLowerCase() !== "uncategorized";
  });
}

export function renderCategories(categories, categorySelect) {
  const filteredCategories = filterOutUncategorized(categories);

  filteredCategories.forEach((category) => {
    const categoryOption = utils.createHTMLElement("option", null, utils.getParsedText(category.name));
    categoryOption.value = category.slug;

    categorySelect.append(categoryOption);
  });
}
