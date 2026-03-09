import { tag, div, a, button, img, span } from "taggedjs";
import { adminNavItems, withManufacturerEmoji } from "./adminNavItems.js";
import { toFilamentPath } from "./path-utils.js";

const renderUser = (user: any) => {
  if (!user?.email) return null;
  const avatar = user.photoURL
    ? img
        .class("user-avatar-image")
        .src(user.photoURL)
        .alt(user.email)
        .referrerPolicy("no-referrer")

    : span.class`user-avatar-fallback`(
        (user.email || "?")[0].toUpperCase()
      );
  return div.class`user-badge`(
    avatar,
    span.class`user-email`(user.email)
  );
};

export const AdminNav = tag((onSignOut, user) => {
  AdminNav.updates((args) => {
    [onSignOut, user] = args;
  });

  const renderNavLabel = (item: any) => {
    const label = withManufacturerEmoji(item.label);
    return label.includes(item.emoji) ? label : `${item.emoji} ${label}`;
  };

  return div.class`menu-bar`(
    renderUser(user),
    div.class`menu-actions`(
      a
        .class("menu-button")
        .href("/")
        ("🏠 Home"),
      
      a
        .class("menu-button")
        .href(toFilamentPath("admin.html"))
        ("🧭 Admin home"),
      
      ...adminNavItems.map((item) =>
        a
          .class`menu-button`
          .href(toFilamentPath(item.href))
          (renderNavLabel(item))
      ),

      onSignOut &&
      button
      .type("button")
      .class("menu-button")
      .onClick(onSignOut)
      ("🚪 Sign out")
    )
  );
});
