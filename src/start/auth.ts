import { openSignIn } from "../functions/page";
import { getAuth, signIn } from "../functions/auth";
import { tryCatch } from "../functions/common";

import type { Auth } from "../models/auth";
import { AUTH } from "../models/constants";

import { removeFile, setFile } from "../services/filesystem";
import { getNetworkStatus } from "../services/network";

import { loaderStore } from "../stores/loader";
import { authStore } from "../stores/auth";

export const setAuth = function (auth: Auth) {
  setFile(AUTH, JSON.stringify(auth));
  authStore.set(auth);
};

export const removeAuth = function () {
  removeFile(AUTH).catch(() => 0);
  authStore.set(null);
  loaderStore.set(false);
  openSignIn();
};

export const loadLocalAuth = (isOffline: boolean) =>
  tryCatch(async () => {
    const auth = await getAuth();
    if (!auth) removeAuth();
    else {
      if (isOffline) setAuth(auth);
      return auth.id;
    }
  });

export const loadRemoteAuth = (id?: string) =>
  tryCatch(async () => {
    if (id) {
      const auth = await signIn(id);
      if (auth) setAuth(auth);
      else removeAuth();
    }
  });

export const loadAuthEvent = () =>
  tryCatch(async () => {
    const isOnline = await getNetworkStatus();
    const id = await loadLocalAuth(!isOnline);
    if (isOnline) await loadRemoteAuth(id);
  });

window.addEventListener("load", loadAuthEvent);
window.addEventListener("beforeunload", () =>
  window.removeEventListener("load", loadAuthEvent)
);
