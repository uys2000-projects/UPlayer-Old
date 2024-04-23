import type { Unsubscriber } from "svelte/store";
import { authStore } from "../stores/auth";
import { loaderStore } from "../stores/loader";
import { downloadPlaylist, getPlaylist } from "../functions/playlist";
import { getFile, removeFile, setFile } from "../services/filesystem";
import { PLAYLIST, RAWPLAYLIST } from "../models/constants";
import type { CustomPlaylist } from "../models/playlist";
import { tryCatch } from "../functions/common";
import { playlistStore } from "../stores/playlist";
import { openHome, openSignIn, openUrlControl } from "../functions/page";
import type { Auth } from "../models/auth";

let unsubscriber: Unsubscriber;
let onRun = false;
let firstRun = true;
const noAuthFound = function () {
  removeFile(RAWPLAYLIST).catch(() => 0);
  removeFile(PLAYLIST).catch(() => 0);
  loaderStore.set(false);
  openSignIn.logger();
};

const noUrlFound = function () {
  loaderStore.set(false);
  openUrlControl();
};

const playlistLoaded = function () {
  loaderStore.set(false);
  openHome();
};

export const authControl = async function (auth: Auth | null) {
  if (firstRun) firstRun = false;
  else if (!auth) noAuthFound();
  else if (!auth.url || auth.url == "") noUrlFound();
  else if (!onRun) {
    onRun = true;
    const result = await loadRemotePlaylist(auth.url);
    if (result) playlistLoaded();
    else noUrlFound();
    onRun = false;
  }
};

const loadRemotePlaylist = (url: string): Promise<boolean> =>
  tryCatch(async () => {
    const data = await downloadPlaylist.pLogger(url).catch(() => undefined);
    if (data) {
      const playlist = await getPlaylist.pLogger(data);
      if (playlist) {
        playlistStore.set(playlist);
        return true;
      }
    }
    return false;
  });

const loadLocalPlaylist = () =>
  tryCatch(async () => {
    const playlist = await getFile<CustomPlaylist>(PLAYLIST).catch(
      () => undefined
    );
    if (playlist) playlistStore.set(playlist);
    else {
      const playlist = await getFile<{ data: string }>(RAWPLAYLIST).catch(
        () => undefined
      );
      if (playlist) playlistStore.set(getPlaylist(playlist.data));
    }
  });

unsubscriber = authStore.subscribe(async (auth) => authControl(auth));

window.addEventListener("load", loadLocalPlaylist);

window.addEventListener("beforeunload", () => {
  window.removeEventListener("load", loadLocalPlaylist);
  unsubscriber();
});
