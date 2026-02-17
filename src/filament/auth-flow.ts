import { prepareAuth, onAuthChanged } from "./firebase.js";
import type { AuthUser, ToastApi } from "./auth-types.js";

type StartAuthFlowOptions = {
  onUser: (user: AuthUser | null, reason: string) => void;
  toast?: ToastApi;
};

export const startAuthFlow = ({ onUser, toast }: StartAuthFlowOptions) => {
  if (typeof onUser !== "function") {
    throw new Error("startAuthFlow requires an onUser callback.");
  }

  prepareAuth()
    .then(({ redirectError, redirectResult, persistence }) => {
      if (redirectError) {
        toast?.error?.("Sign-in failed after redirect. Try again.");
      }
      if (persistence?.error) {
        toast?.error?.("Safari blocked login storage. Check cookie settings.");
      }
      if (redirectResult?.user) {
        onUser(redirectResult.user, "redirectResult");
      }
    })
    .catch((error) => {
      console.error("Failed to prepare auth", error);
      toast?.error?.("Sign-in setup failed. Try again.");
    });

  onAuthChanged((user) => {
    onUser(user, "onAuthChanged");
  });
};
