export function createHTMLElement(tagname, classnames = null, text = null, children = null, url = null, src = null, alt = null) {
  const element = document.createElement(tagname);

  if (classnames) {
    if (Array.isArray(classnames)) {
      element.classList.add(...classnames);
    } else {
      element.classList.add(classnames);
    }
  }

  if (text) {
    element.textContent = text;
  }

  if (children) {
    if (Array.isArray(children)) {
      element.append(...children);
    } else {
      element.appendChild(children);
    }
  }

  if (url) {
    element.href = url;
  }

  if (src && alt) {
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);
  }

  return element;
}

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body;
}
