import { tag, tagElement } from "taggedjs";
import { FilamentFastEditApp } from "./FilamentFastEditApp.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { toast } from "../shared/toast.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";

const appRoot = { current: document.getElementById("fastEditApp") };
const location = appRoot.current?.dataset?.location || "";
const locationSlug = appRoot.current?.dataset?.locationSlug || "";
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const App = tag(() => FilamentFastEditApp(location, locationSlug, currentUser));

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(App, nextRoot);
  appMounted = true;
};
const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAuthorized: () => {
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
