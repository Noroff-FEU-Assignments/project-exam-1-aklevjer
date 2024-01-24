import * as pages from "./pages/index.js";

export async function router() {
  const url = new URL(location.href);
  const params = Object.fromEntries(url.searchParams.entries());

  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      await pages.homePage();
      break;

    case "/pages/blog":
    case "/pages/blog/":
    case "/pages/blog/index.html":
      await pages.blogPage();
      break;

    case "/pages/blog/post":
    case "/pages/blog/post/":
    case "/pages/blog/post/index.html":
      await pages.postPage(params.id);
      break;

    case "/pages/about":
    case "/pages/about/":
    case "/pages/about/index.html":
      pages.aboutPage();
      break;

    case "/pages/contact":
    case "/pages/contact/":
    case "/pages/contact/index.html":
      pages.contactPage();
      break;
  }
}
