import * as pages from "./pages/index.js";
import * as ui from "./ui/index.js";

ui.initMobileNav();

switch (location.pathname) {
  case "/":
    pages.homePage();
    break;
  case "/pages/blog/":
    pages.blogPage();
    break;
  case "/pages/blog/post/":
    pages.postPage();
    break;
  case "/pages/about/":
    pages.aboutPage();
    break;
  case "/pages/contact/":
    pages.contactPage();
    break;
}
