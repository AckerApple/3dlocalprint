import { FilamentInventoryApp } from "./FilamentInventoryApp.tag.js";
import { replaceMountRoot } from "./ssoMount.js";
import { tag, tagElement } from "taggedjs";
import { toast } from "./toast.js";
import { startAdminAppShell } from "./adminAppShell.js";

const filamentRoot = { current: document.getElementById("filamentApp") };
const selectedLocation = filamentRoot.current?.dataset?.location || "";
const selectedLocationSlug = filamentRoot.current?.dataset?.locationSlug || "";
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const InventoryRoot = tag(() =>
  FilamentInventoryApp(
    handleSignOut,
    currentUser,
    selectedLocation,
    selectedLocationSlug
  )
);

const mountApp = (reason = "") => {
  if (!filamentRoot.current || appMounted) {
    return;
  }

  const nextRoot = replaceMountRoot(filamentRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(InventoryRoot, nextRoot);
  appMounted = true;
};
const auth = startAdminAppShell({
  rootRef: filamentRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAuthorized: () => {
    mountApp("auth:authorized");
  },
});
handleSignOut = auth.handleSignOut;
