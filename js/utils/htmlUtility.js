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
    element.src = src;
    element.alt = alt;
  }

  return element;
}

export function clearElement(element) {
  element.innerHTML = "";
}

export function hideElement(element, shouldHide) {
  element.classList.toggle("hidden", shouldHide);
}

export function parseHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body;
}

export function getParsedText(htmlString) {
  const parsedString = parseHTML(htmlString);
  return parsedString.textContent;
}
