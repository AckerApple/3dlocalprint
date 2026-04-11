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
}) => {
  const root = replaceMountRoot(rootRef);
  if (!root) return;
  if (setAppMounted) setAppMounted(false);
  root.replaceChildren();
  const SsoApp = tag(() =>
    SsoPanel(status, userEmail, adminEmail, onSignIn, onSignOut)
  );
  tagElement(SsoApp, root);
};
