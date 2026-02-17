export type AuthUser = {
  email?: string | null;
  photoURL?: string | null;
};

export type MountSsoFn = (
  status: string,
  userEmail?: string,
  reason?: string
) => void;

export type ToastApi = {
  error?: (message: string) => void;
  success?: (message: string) => void;
  info?: (message: string) => void;
};
