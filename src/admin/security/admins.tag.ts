import { saveAdmins, subscribeAdmins } from "../shared/firebase.js";
import { tag, tagElement, section, div, input, button, p, a, h1 } from "taggedjs";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { toast } from "../shared/toast.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";

let app = document.getElementById("adminsApp");
const appRoot = { current: app };
const state = [];
let newAdminEmail = "";
let stopAdmins = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const rerender = () => {
  if (!appRoot.current) return;
  appRoot.current.replaceChildren();
  tagElement(AdminsApp, appRoot.current);
};

const addAdmin = () => {
  const value = newAdminEmail.trim().toLowerCase();
  if (!value) {
    toast.error("Enter an email address.");
    return;
  }
  if (state.some((email) => email.toLowerCase() === value)) {
    toast.error("That admin is already listed.");
    return;
  }
  state.push(value);
  newAdminEmail = "";
  rerender();
};

const removeAdmin = (index) => {
  const email = state[index] || "";
  if (!confirm(`Remove admin ${email}?`)) return;
  state.splice(index, 1);
  rerender();
};

const saveList = async () => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }
  try {
    await saveAdmins(state.map((email) => email));
    toast.success("Admins saved.");
  } catch (error) {
    console.error("Failed to save admins", error);
    toast.error("Save failed. Try again.");
  }
};

export const AdminsApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel manufacturers-panel`(
    h1("Manage Admins"),
    p("Update the list of emails allowed to access the filament tools."),
    div.class`manufacturer-list`(
      ...state.map((email, index) =>
        div.class`manufacturer-row`(
          input
            .class`manufacturer-input`
            .type`email`
            .value(_=> state[index] ?? "")
            .onInput((event) => {
              state[index] = event.target.value.trim().toLowerCase();
            })(),
          button
            .type`button`
            .class`ghost-button`
            .onClick(() => removeAdmin(index))(
            "Remove"
          )
        )
      )
    ),
    div.class`manufacturer-add`(
      input
        .class`manufacturer-input`
        .type`email`
        .placeholder`New admin email`
        .value(_=> newAdminEmail)
        .onInput((event) => {
          newAdminEmail = event.target.value;
        })(),
      button
        .type`button`
        .class`add-button`
        .onClick(addAdmin)(
        "➕ Add admin"
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
  tagElement(AdminsApp, nextRoot);
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
    if (stopAdmins) {
      stopAdmins();
      stopAdmins = null;
    }
  },
  onDenied: () => {
    if (stopAdmins) {
      stopAdmins();
      stopAdmins = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!stopAdmins) {
      stopAdmins = subscribeAdmins((items) => {
        if (Array.isArray(items) && items.length) {
          state.splice(0, state.length, ...items);
        } else {
          state.splice(0, state.length);
        }
        if (authState.isAuthorized) {
          if (appMounted) {
            rerender();
          } else {
            mountApp("admins:update");
          }
        }
      });
    }
    mountApp("auth:authorized");
  },
});
handleSignOut = auth.handleSignOut;
