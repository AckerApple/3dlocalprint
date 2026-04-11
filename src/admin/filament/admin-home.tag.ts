import {
  tag,
  tagElement,
  div,
  section,
  h1,
  h2,
  p,
  a,
  button,
  img,
  span,
} from "taggedjs";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { adminNavGroups, withManufacturerEmoji } from "../shared/adminNavItems.js";
import { toast } from "../shared/toast.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";

let app = document.getElementById("adminHomeApp");
const appRoot = { current: app };
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const renderUser = (user) => {
  if (!user?.email) return null;
  const avatar = user.photoURL
    ? img
        .class`user-avatar-image`
        .src(user.photoURL)
        .alt(user.email)
        .attr("referrerpolicy", "no-referrer")()
    : span.class`user-avatar-fallback`(
        (user.email || "?")[0].toUpperCase()
      );
  return div.class`user-badge`(
    avatar,
    span.class`user-email`(user.email)
  );
};

export const AdminHomeApp = tag(() => [
  section.class`admin-home`(
    div.class`admin-home-top`(
      renderUser(currentUser),
      button
        .type`button`
        .class`menu-button admin-home-signout`
        .onClick(handleSignOut)(
        "🚪 Sign out"
      )
    ),
    div.class`admin-home-header`(
      h1("Admin Home"),
      p("Choose an admin area to get started.")
    ),
    ...adminNavGroups.map((group) =>
      section.class`admin-home-group`(
        h2.class`admin-home-group-title`(group.title),
        div.class`admin-home-grid`(
          ...group.items.map((item) =>
            a
              .class`panel admin-home-card`
              .href(item.href)(
              div.class`admin-home-emoji`(item.emoji),
              h2(withManufacturerEmoji(item.label)),
              p(withManufacturerEmoji(item.details))
            )
          )
        )
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
  tagElement(AdminHomeApp, nextRoot);
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
  onAuthorized: () => {
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
