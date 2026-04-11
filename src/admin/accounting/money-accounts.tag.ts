import {
  saveMoneyAccounts,
  subscribeMoneyAccounts,
} from "../shared/firebase.js";
import {
  tag,
  tagElement,
  section,
  div,
  input,
  button,
  p,
  h1,
  array,
  subscribe,
} from "taggedjs";
import { toast } from "../shared/toast.js";
import { AdminNav } from "../shared/AdminNav.tag.js";
import { replaceMountRoot } from "../shared/ssoMount.js";
import { startAdminAppShell } from "../shared/adminAppShell.js";
import type { MoneyAccount } from "../../types/ledger.js";

let app = document.getElementById("moneyAccountsApp");
const appRoot = { current: app };
const moneyAccounts$ = array<MoneyAccount>([]);
let newTitle = "";
let newNotes = "";
let stopMoneyAccounts = null;
let appMounted = false;
let currentUser = null;
let handleSignOut = () => Promise.resolve();

const createId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `money_${Date.now().toString(36)}_${rand}`;
};

const normalizeTitle = (value = "") => value.trim().toLowerCase();

const sortMoneyAccounts = (items: MoneyAccount[]) =>
  [...items].sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")));

const addMoneyAccount = () => {
  const title = String(newTitle || "").trim();
  const notes = String(newNotes || "").trim();
  if (!title) {
    toast.error("Enter an account title.");
    return;
  }

  const existing = moneyAccounts$.value.some(
    (item) => normalizeTitle(item?.title || "") === normalizeTitle(title)
  );
  if (existing) {
    toast.error("That account title already exists.");
    return;
  }

  const now = Date.now();
  moneyAccounts$.push({
    id: createId(),
    title,
    notes,
    createdAt: now,
    updatedAt: now,
  });
  const sorted = sortMoneyAccounts(moneyAccounts$.value);
  moneyAccounts$.splice(0, moneyAccounts$.length, ...sorted);
  newTitle = "";
  newNotes = "";
};

const removeMoneyAccount = (index: number) => {
  moneyAccounts$.splice(index, 1);
};

const saveList = async () => {
  if (!auth.authState.isAuthorized) {
    toast.error("Sign in to save changes.");
    return;
  }

  const now = Date.now();
  const normalized = sortMoneyAccounts(
    moneyAccounts$.value
      .map((item) => ({
        id: String(item?.id || "").trim() || createId(),
        title: String(item?.title || "").trim(),
        notes: String(item?.notes || "").trim(),
        createdAt: Number(item?.createdAt) || now,
        updatedAt: now,
      }))
      .filter((item) => item.title)
  );

  const titleSet = new Set<string>();
  for (const item of normalized) {
    const key = normalizeTitle(item.title);
    if (titleSet.has(key)) {
      toast.error(`Duplicate account title: ${item.title}`);
      return;
    }
    titleSet.add(key);
  }

  try {
    await saveMoneyAccounts(normalized);
    toast.success("Money accounts saved.");
  } catch (error) {
    console.error("Failed to save money accounts", error);
    toast.error("Save failed. Try again.");
  }
};

export const MoneyAccountsApp = tag(() => [
  AdminNav(handleSignOut, currentUser),
  section.class`panel manufacturers-panel`(
    h1("Money Accounts"),
    p("Add and edit the list of money accounts available in ledger entries."),
    div.class`manufacturer-list`(
      subscribe(
        moneyAccounts$,
        (items) =>
          items.map((item, index) =>
            div.class`manufacturer-row`(
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`Account title`
                .value(() => item?.title ?? "")
                .onInput((event) => {
                  moneyAccounts$[index] = {
                    ...moneyAccounts$[index],
                    title: String(event.target.value || ""),
                    updatedAt: Date.now(),
                  };
                })(),
              input
                .class`manufacturer-input`
                .type`text`
                .placeholder`Notes (optional)`
                .value(() => item?.notes ?? "")
                .onInput((event) => {
                  moneyAccounts$[index] = {
                    ...moneyAccounts$[index],
                    notes: String(event.target.value || ""),
                    updatedAt: Date.now(),
                  };
                }),
              button
                .type`button`
                .class`ghost-button`
                .onClick(() => removeMoneyAccount(index))(
                "Remove"
              )
            )
          )
      )
    ),
    div.class`manufacturer-add`(
      input
        .class`manufacturer-input`
        .type`text`
        .placeholder`New account title`
        .value(() => newTitle)
        .onInput((event) => {
          newTitle = event.target.value;
        })(),
      input
        .class`manufacturer-input`
        .type`text`
        .placeholder`Notes (optional)`
        .value(() => newNotes)
        .onInput((event) => {
          newNotes = event.target.value;
        })(),
      button
        .type`button`
        .class`add-button`
        .onClick(addMoneyAccount)(
        "➕ Add Account"
      )
    ),
    div.class`auth-actions`(
      button
        .type`button`
        .class`add-button`
        .onClick(saveList)(
        "💾 Save to Firestore"
      )
    )
  ),
]);

const mountApp = () => {
  if (!appRoot.current || appMounted) {
    return;
  }
  const nextRoot = replaceMountRoot(appRoot);
  if (!nextRoot) return;
  nextRoot.replaceChildren();
  tagElement(MoneyAccountsApp, nextRoot);
  appMounted = true;
  app = appRoot.current;
};

const auth = startAdminAppShell({
  rootRef: appRoot,
  toast,
  setAppMounted: (value) => {
    appMounted = value;
  },
  setCurrentUser: (value) => {
    currentUser = value;
  },
  onAfterSsoMount: () => {
    app = appRoot.current;
  },
  onSignedOut: () => {
    if (stopMoneyAccounts) {
      stopMoneyAccounts();
      stopMoneyAccounts = null;
    }
  },
  onDenied: () => {
    if (stopMoneyAccounts) {
      stopMoneyAccounts();
      stopMoneyAccounts = null;
    }
  },
  onAuthorized: ({ authState }) => {
    if (!stopMoneyAccounts) {
      stopMoneyAccounts = subscribeMoneyAccounts((items) => {
        const normalized = sortMoneyAccounts(
          (Array.isArray(items) ? items : [])
            .map((item) => ({
              id: String(item?.id || "").trim(),
              title: String(item?.title || "").trim(),
              notes: String(item?.notes || "").trim(),
              createdAt: Number(item?.createdAt) || Date.now(),
              updatedAt: Number(item?.updatedAt) || Date.now(),
            }))
            .filter((item) => item.id && item.title)
        );
        moneyAccounts$.splice(0, moneyAccounts$.length, ...normalized);
        if (authState.isAuthorized) {
          mountApp();
        }
      });
    }
    mountApp();
  },
});
handleSignOut = auth.handleSignOut;
