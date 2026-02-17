import { signIn, signOutUser } from "./firebase.js";
import { mountSsoPanel } from "./ssoMount.js";
import { handleAdminAuthUser } from "./auth-handler.js";
import { startAuthFlow } from "./auth-flow.js";
import type { AuthUser, MountSsoFn, ToastApi } from "./auth-types.js";

type AppRootRef = {
  current?: HTMLElement | null;
};

type AuthState = {
  isAuthorized: boolean;
};

type StartAdminAppShellOptions = {
  rootRef: AppRootRef;
  toast: ToastApi;
  setAppMounted?: (value: boolean) => void;
  setCurrentUser?: (value: { email: string; photoURL: string } | null) => void;
  onAuthorized?: (args: {
    user?: AuthUser;
    reason?: string;
    authState: AuthState;
    handleSignOut: () => Promise<void>;
    mountSso: MountSsoFn;
  }) => void;
  onSignedOut?: () => void;
  onDenied?: () => void;
  onAfterSsoMount?: () => void;
  initialStatus?: string;
  initialReason?: string;
};

export const startAdminAppShell = ({
  rootRef,
  toast,
  setAppMounted,
  setCurrentUser,
  onAuthorized,
  onSignedOut,
  onDenied,
  onAfterSsoMount,
  initialStatus = "loading",
  initialReason = "initial",
}: StartAdminAppShellOptions) => {
  const authState: AuthState = { isAuthorized: false };

  const handleSignOut = async () =>
    signOutUser().catch((error) => {
      console.error("Firebase sign-out failed", error);
      toast?.error?.("Sign out failed. Try again.");
    });

  const mountSso: MountSsoFn = (status, userEmail = "", reason = "") => {
    if (!rootRef?.current) return;
    mountSsoPanel({
      rootRef,
      status,
      userEmail,
      adminEmail: "",
      onSignIn: () =>
        signIn().catch((error) => {
          console.error("Firebase sign-in failed", error);
          toast?.error?.("Sign in failed. Try again.");
        }),
      onSignOut: handleSignOut,
      setAppMounted,
    });

    if (typeof onAfterSsoMount === "function") {
      onAfterSsoMount();
    }
  };

  mountSso(initialStatus, "", initialReason);

  const handleAuthUser = async (user: AuthUser | null, reason = "") => {
    authState.isAuthorized = false;

    const isAllowed = await handleAdminAuthUser({
      user,
      mountSso,
      toast,
      setCurrentUser,
      onSignedOut,
      onDenied,
      onAuthorized: (nextUser: AuthUser, nextReason: string) => {
        authState.isAuthorized = true;
        onAuthorized?.({
          user: nextUser,
          reason: nextReason,
          authState,
          handleSignOut,
          mountSso,
        });
      },
      reason,
    });

    if (!isAllowed) return;
  };

  startAuthFlow({
    onUser: handleAuthUser,
    toast,
  });

  return {
    authState,
    handleSignOut,
    mountSso,
  };
};
