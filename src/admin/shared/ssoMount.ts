import { tag, tagElement } from "taggedjs";
import { SsoPanel } from "./sso.tag.js";

export const replaceMountRoot = (rootRef) => {
  const root = rootRef?.current;
  if (!root) return null;
  const nextRoot = root.cloneNode(false);
  root.replaceWith(nextRoot);
  rootRef.current = nextRoot;
  return nextRoot;
};

export const mountSsoPanel = ({
  rootRef,
  status,
  userEmail,
  adminEmail,
  onSignIn,
  onSignOut,
  setAppMounted,
}: {
  rootRef: any
  status: any
  userEmail: string
  adminEmail: string
  onSignIn: any
  onSignOut: any
  setAppMounted: any
}) => {
  const root = replaceMountRoot(rootRef);
  if (!root) return;
  if (setAppMounted) setAppMounted(false);
  root.replaceChildren();
  tagElement(SsoApp, root, [
    status, userEmail, adminEmail, onSignIn, onSignOut
  ]);
};

const SsoApp = tag((
  status, userEmail, adminEmail, onSignIn, onSignOut,
) =>
  SsoPanel(status, userEmail, adminEmail, onSignIn, onSignOut)
);
