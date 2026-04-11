import { isAdminEmail } from "./firebase.js";
import type { AuthUser, MountSsoFn, ToastApi } from "./auth-types.js";

type EnsureAdminAccessOptions = {
  user?: AuthUser | null;
  mountSso?: MountSsoFn;
  toast?: ToastApi;
  onDenied?: () => void;
  onPermissionsError?: (error: unknown) => void;
};

export const ensureAdminAccess = async ({
  user,
  mountSso,
  toast,
  onDenied,
  onPermissionsError,
}: EnsureAdminAccessOptions = {}) => {
  let isAllowed = false;
  try {
    isAllowed = await isAdminEmail(user?.email || "");
  } catch (error) {
    console.error("Failed to load admin list", error);
    if (typeof onPermissionsError === "function") {
      onPermissionsError(error);
    }
    if (toast?.error) {
      toast.error("Unable to verify access. Check Firestore rules.");
    }
    if (typeof mountSso === "function") {
      mountSso("denied", user?.email || "", "auth:permissions");
    }
    return false;
  }

  if (!isAllowed) {
    if (typeof onDenied === "function") {
      onDenied();
    }
    if (toast?.error) {
      toast.error(
        `Signed in as ${user?.email || "unknown"} but not authorized.`
      );
    }
    if (typeof mountSso === "function") {
      mountSso("denied", user?.email || "", "auth:denied");
    }
    return false;
  }

  return true;
};
