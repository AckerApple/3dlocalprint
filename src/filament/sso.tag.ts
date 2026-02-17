import {
  tag,
  section,
  div,
  h2,
  p,
  span,
  button,
} from "taggedjs";

export const SsoPanel = tag(
  (status, userEmail, adminEmail, onSignIn, onSignOut) => {
    SsoPanel.updates((args) => {
      [status, userEmail, adminEmail, onSignIn, onSignOut] = args;
    });

    if (status === "loading") {
      return section.class`panel auth-panel`(p("Checking login..."));
    }

    if (status === "denied") {
      return section.class`panel auth-panel`(
        h2("Access denied"),
        p.class`auth-warning`(
          () => userEmail || "This account",
          " is not authorized.",
        ),
        div.class`auth-actions`(
          button(
            {
              type: "button",
              class: "add-button",
              onClick: onSignOut,
            },
            "Sign out"
          )
        )
      );
    }

    return section.class`panel auth-panel`(
      h2("Sign in"),
      p("Use Google to access the filament inventory."),
      div.class`auth-actions`(
        button(
          {
            type: "button",
            class: "add-button",
            onClick: onSignIn,
          },
          "Sign in with Google"
        )
      )
    );
  }
);
