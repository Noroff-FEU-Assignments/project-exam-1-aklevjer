import { router } from "./router.js";
import * as ui from "./ui/index.js";

await router();
ui.initMobileNav();
