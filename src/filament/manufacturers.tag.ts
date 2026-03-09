import {
  saveManufacturers,
  subscribeManufacturers,
} from "./firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  input,
  button,
  p,
  h1,
  array,
  subscribe,
} from "taggedjs";
import { toast } from "./toast.js";
import { AdminNav } from "./AdminNav.tag.js";
import { replaceMountRoot } from "./ssoMount.js";
import { startAdminAppShell } from "./adminAppShell.js";
import { ManufacturerLabel } from "./ManufacturerLabel.tag.js";
import type { ManufacturerItem } from "../types/filament.js";

let app = document.getElementById("manufacturersApp");
const appRoot = { current: app };
const manufacturers$ = array([]);
let newManufacturerLabel = "";
let newManufacturerIconUrl = "";
let stopManufacturers = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const addManufacturer = () => {
  const label = newManufacturerLabel.trim();
  const iconUrl = newManufacturerIconUrl.trim();
  if (!label) return;
  manufacturers$.push({ label, iconUrl });
  newManufacturerLabel = "";
  newManufacturerIconUrl = "";
};

const removeManufacturer = (index) => {
  manufacturers$.splice(index, 1);
};

const saveList = async () => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }
  try {
    await saveManufacturers(
      manufacturers$.value
        .map((item) => ({
          label: String(item?.label || "").trim(),
          iconUrl: String(item?.iconUrl || "").trim(),
        }))
        .filter((item) => item.label)
    );
    toast.success("🏭 Manufacturers saved.");
  } catch (error) {
    console.error("Failed to save 🏭 manufacturers", error);
    toast.error("Save failed. Try again.");
  }
};

export const ManufacturersApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel manufacturers-panel`(
    h1("🏭 Manage Filament Manufacturers"),
    p("Update the list used by the filament inventory and add new entries."),
    div.class`manufacturer-list`(
      subscribe(
        manufacturers$,
        (items) =>
          items.map((item, index) =>
            div.class`manufacturer-row`(
              _=> item?.iconUrl &&
                ManufacturerLabel({
                  label: item?.label || "Manufacturer",
                  iconUrl: item?.iconUrl || "",
                  showLabel: false,
                  linkIcon: true,
                  iconClassName: "manufacturer-icon",
                  linkClassName: "manufacturer-icon-link",
                }),
              input
                .class`manufacturer-input`
                .type`text`
                .attr("placeholder", "Manufacturer label")
                .value(() => item?.label ?? "")
                .onInput((event) => {
                  manufacturers$[index] = {
                    ...manufacturers$[index],
                    label: event.target.value,
                  };
                })(),
              input
                .class`manufacturer-input`
                .type`url`
                .attr("placeholder", "Icon URL (optional)")
                .value(() => item?.iconUrl ?? "")
                .onInput((event) => {
                  manufacturers$[index] = {
                    ...manufacturers$[index],
                    iconUrl: event.target.value,
                  };
                })(),
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => removeManufacturer(index))(
                "Remove"
              )
            )
          )
      )
    ),
    div.class`manufacturer-add`(
      input
        .class`manufacturer-input`
        .type`text`
        .attr("placeholder", "New 🏭 manufacturer label")
        .value(() => newManufacturerLabel)
        .onInput((event) => {
          newManufacturerLabel = event.target.value;
        })(),
      input
        .class`manufacturer-input`
        .type`url`
        .attr("placeholder", "New icon URL (optional)")
        .value(() => newManufacturerIconUrl)
        .onInput((event) => {
          newManufacturerIconUrl = event.target.value;
        })(),
      _=> newManufacturerIconUrl &&
        ManufacturerLabel({
          label: "New manufacturer",
          iconUrl: newManufacturerIconUrl,
          showLabel: false,
          linkIcon: true,
          iconClassName: "manufacturer-icon",
          linkClassName: "manufacturer-icon-link",
        }),
      button
        .type`button`
        .class`add-button`
        .onClick(addManufacturer)(
        "➕ Add 🏭 manufacturer"
      )
    ),
    div.class`auth-actions`(
      button
        .type`button`
        .class`add-button`
        .onClick(saveList)(
        "💾 Save to Firestore"
      )
    )
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(ManufacturersApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
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
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onSignedOut: () => {
    if (stopManufacturers) {
      stopManufacturers();
      stopManufacturers = null;
    }
  },
  onDenied: () => {
    if (stopManufacturers) {
      stopManufacturers();
      stopManufacturers = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!stopManufacturers) {
      stopManufacturers = subscribeManufacturers((items) => {
        if (Array.isArray(items) && items.length) {
          manufacturers$.splice(
            0,
            manufacturers$.length,
            ...items.map((item) => ({
              label: String(item?.label || "").trim(),
              iconUrl: String(item?.iconUrl || "").trim(),
            }))
          )
        } else {
          manufacturers$.splice(0, manufacturers$.length)
        }
        if (authState.isAuthorized) {
          mountApp()
        }
      });
    }
    mountApp()
  },
});
handleSignOut = auth.handleSignOut;
