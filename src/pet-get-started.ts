import { prepareAuth, signIn, onAuthChanged } from "./admin/shared/firebase.js";

type AuthLikeUser = {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
};

const authStep = document.querySelector<HTMLElement>("[data-pet-step='auth']");
const uploadStep = document.querySelector<HTMLElement>("[data-pet-step='upload']");
const reviewStep = document.querySelector<HTMLElement>("[data-pet-step='review']");
const statusStep = document.querySelector<HTMLElement>("[data-pet-step='status']");
const authStatus = document.querySelector<HTMLElement>("[data-pet-auth-status]");
const authMessage = document.querySelector<HTMLElement>("[data-pet-auth-message]");
const authSummary = document.querySelector<HTMLElement>("[data-pet-auth-summary]");
const authAvatar = document.querySelector<HTMLElement>("[data-pet-auth-avatar]");
const authAvatarImage = document.querySelector<HTMLImageElement>("[data-pet-auth-avatar-image]");
const authAvatarFallback = document.querySelector<HTMLElement>("[data-pet-auth-avatar-fallback]");
const authEmail = document.querySelector<HTMLElement>("[data-pet-auth-email]");
const googleButton = document.querySelector<HTMLButtonElement>("[data-pet-google-signin]");
const stepElements = Array.from(document.querySelectorAll<HTMLElement>("[data-pet-step]"));

const setBodyVisible = (step: HTMLElement | null, visible: boolean) => {
  const body = step?.querySelector<HTMLElement>("[data-pet-step-body]");
  if (body) {
    body.hidden = !visible;
  }
};

const setLockNoteVisible = (step: HTMLElement | null, visible: boolean) => {
  const note = step?.querySelector<HTMLElement>("[data-pet-lock-note]");
  if (note) {
    note.hidden = !visible;
  }
};

const setStepState = (
  step: HTMLElement | null,
  state: "active" | "complete" | "locked"
) => {
  if (!step) return;
  step.classList.toggle("pet-start-step-active", state === "active");
  step.classList.toggle("pet-start-step-complete", state === "complete");
  step.classList.toggle("pet-start-step-locked", state === "locked");
  step.classList.toggle("pet-start-step-muted", state === "locked");

  const status = step.querySelector<HTMLElement>(".pet-step-status");
  if (status && !status.hasAttribute("data-pet-auth-status")) {
    status.textContent = state === "active"
      ? "Current"
      : state === "complete"
        ? "Completed"
        : "Locked";
  }
};

const formatUserLabel = (user: AuthLikeUser) =>
  String(user.displayName || user.email || "Signed in").trim();

const formatUserEmail = (user: AuthLikeUser) =>
  String(user.email || user.displayName || "Signed in").trim();

const userInitial = (user: AuthLikeUser) =>
  formatUserLabel(user).charAt(0).toUpperCase() || "?";

const setAuthAvatar = (user: AuthLikeUser | null) => {
  if (!user) {
    if (authSummary) {
      authSummary.hidden = true;
    }
    if (authAvatar) {
      authAvatar.removeAttribute("title");
      authAvatar.classList.remove("pet-auth-avatar-photo");
    }
    if (authAvatarImage) {
      authAvatarImage.hidden = true;
      authAvatarImage.removeAttribute("src");
    }
    if (authAvatarFallback) {
      authAvatarFallback.hidden = false;
      authAvatarFallback.textContent = "";
    }
    if (authEmail) {
      authEmail.textContent = "";
    }
    return;
  }

  const photoURL = String(user.photoURL || "").trim();
  if (authSummary) {
    authSummary.hidden = false;
  }
  if (authAvatar) {
    authAvatar.title = `Signed in as ${formatUserLabel(user)}`;
    authAvatar.classList.toggle("pet-auth-avatar-photo", Boolean(photoURL));
  }
  if (authAvatarImage) {
    authAvatarImage.hidden = !photoURL;
    if (photoURL) {
      authAvatarImage.src = photoURL;
    } else {
      authAvatarImage.removeAttribute("src");
    }
  }
  if (authAvatarFallback) {
    authAvatarFallback.hidden = Boolean(photoURL);
    authAvatarFallback.textContent = photoURL ? "" : userInitial(user);
  }
  if (authEmail) {
    authEmail.textContent = formatUserEmail(user);
  }
};

const setSignedOut = () => {
  setStepState(authStep, "active");
  setStepState(uploadStep, "locked");
  setStepState(reviewStep, "locked");
  setStepState(statusStep, "locked");
  setAuthAvatar(null);
  if (authStatus) {
    authStatus.textContent = "Sign in required";
  }
  if (authMessage) {
    authMessage.textContent = "Sign in to unlock the photo upload step.";
  }
  if (googleButton) {
    googleButton.disabled = false;
    googleButton.textContent = "Continue with Google";
  }
  setBodyVisible(authStep, true);
  setBodyVisible(uploadStep, false);
  setBodyVisible(reviewStep, false);
  setBodyVisible(statusStep, false);
  stepElements.forEach((step) => setLockNoteVisible(step, false));
};

const setSignedIn = (user: AuthLikeUser) => {
  setStepState(authStep, "complete");
  setStepState(uploadStep, "active");
  setStepState(reviewStep, "locked");
  setStepState(statusStep, "locked");
  setAuthAvatar(user);
  if (authStatus) {
    authStatus.textContent = "Completed";
  }
  if (authMessage) {
    authMessage.textContent = `Signed in as ${formatUserLabel(user)}.`;
  }
  if (googleButton) {
    googleButton.disabled = true;
    googleButton.textContent = "Signed in";
  }
  setBodyVisible(authStep, false);
  setBodyVisible(uploadStep, true);
  setBodyVisible(reviewStep, false);
  setBodyVisible(statusStep, false);
  stepElements.forEach((step) => setLockNoteVisible(step, false));
};

const start = async () => {
  setSignedOut();

  stepElements.forEach((step) => {
    step.addEventListener("click", (event) => {
      if (!step.classList.contains("pet-start-step-locked")) return;
      if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      stepElements.forEach((item) => {
        if (item !== step) {
          setLockNoteVisible(item, false);
        }
      });
      setLockNoteVisible(step, true);
    });
  });

  googleButton?.addEventListener("click", async () => {
    if (!googleButton) return;
    googleButton.disabled = true;
    googleButton.textContent = "Opening Google...";
    try {
      await signIn();
    } catch (error) {
      console.error("3D Pet Print sign-in failed", error);
      googleButton.disabled = false;
      googleButton.textContent = "Try Google Again";
      if (authMessage) {
        authMessage.textContent = "Google sign-in did not finish. Try again.";
      }
    }
  });

  try {
    await prepareAuth();
  } catch (error) {
    console.error("3D Pet Print auth setup failed", error);
    if (authMessage) {
      authMessage.textContent = "Sign-in setup is unavailable right now.";
    }
  }

  onAuthChanged((user: AuthLikeUser | null) => {
    if (user) {
      setSignedIn(user);
      return;
    }
    setSignedOut();
  });
};

start();
