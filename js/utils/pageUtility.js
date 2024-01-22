export function updatePageTitle(title) {
  document.title += ` - ${title}`;
}

export function getQueryString(paramName) {
  const url = new URL(location.href);
  return url.searchParams.get(paramName);
}
