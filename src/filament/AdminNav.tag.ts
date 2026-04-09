import { tag, div, a, button, img, span } from "taggedjs";
import { adminNavGroups, withManufacturerEmoji } from "./adminNavItems.js";
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
  if (typeof document !== "undefined") {
    document.body?.classList?.add("has-admin-nav");
  }

  AdminNav.updates((args) => {
    [onSignOut, user] = args;
  });

  const renderNavLabel = (item: any) => {
    const label = withManufacturerEmoji(item.label);
    return label.includes(item.emoji) ? label : `${item.emoji} ${label}`;
  };

  const findShell = (event: Event) => {
    const target = event.currentTarget as HTMLElement | null;
    const root = target?.getRootNode?.();

    if (root && "querySelector" in root) {
      const byRoot = (root as ParentNode).querySelector?.(".admin-nav-shell");
      if (byRoot) return byRoot as HTMLElement;
    }

    return document.querySelector(".admin-nav-shell") as HTMLElement | null;
  };

  const setDrawerState = (shell: HTMLElement | null, isOpen: boolean) => {
    if (!shell) return;
    shell.classList.toggle("is-open", isOpen);
    const toggle = shell.querySelector(".nav-hamburger") as HTMLElement | null;
    toggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  const toggleDrawer = (event: Event) => {
    const shell = findShell(event);
    const isOpen = !shell?.classList.contains("is-open");
    setDrawerState(shell, Boolean(isOpen));
  };

  const closeDrawer = (event: Event) => {
    setDrawerState(findShell(event), false);
  };

  return div.class`menu-bar admin-nav-shell`(
    button
      .type("button")
      .class("ghost-button nav-hamburger")
      .attr("aria-label", "Toggle admin navigation")
      .attr("aria-expanded", "false")
      .onClick(toggleDrawer)
      ("☰ Menu"),
    div.class`admin-nav-drawer`(
      div.class`admin-nav-drawer-header`(
        renderUser(user),
        onSignOut &&
          button
            .type("button")
            .class("ghost-button admin-nav-signout")
            .onClick((event) => {
              closeDrawer(event);
              onSignOut();
            })
            ("🚪 Sign out")
      ),
      div.class`admin-nav-section`(
        a.class("menu-button").href("/").onClick(closeDrawer)("🏠 Home"),
        a
          .class("menu-button")
          .href(toFilamentPath("admin.html"))
          .onClick(closeDrawer)
          ("🧭 Admin home")
      ),
      ...adminNavGroups.map((group) =>
        div.class`admin-nav-group`(
          div.class`admin-nav-group-title`(group.title),
          div.class`admin-nav-section`(
            ...group.items.map((item) =>
              a
                .class`menu-button`
                .href(toFilamentPath(item.href))
                .onClick(closeDrawer)
                (renderNavLabel(item))
            )
          )
        )
      )
    ),
    div
      .class("admin-nav-overlay")
      .attr("aria-hidden", "true")
      .onClick(closeDrawer)
      ()
  );
});
