import { parse } from "iptv-playlist-parser";
import { get } from "../services/http";
import { tryCatch } from "./common";
import { setFile } from "../services/filesystem";
import { PLAYLIST, RAWPLAYLIST } from "../models/constants";
import { CustomPlaylist } from "../models/playlist";

export const downloadPlaylist = (url: string) =>
  tryCatch(async () => {
    const { data } = await get(url);
    if (!data || data == "") return undefined;
    await setFile(RAWPLAYLIST, data);
    return data as string;
  });

export const getPlaylist = (str: string) =>
  tryCatch(async () => {
    const playlist = new CustomPlaylist(parse(str));
    await setFile(PLAYLIST, JSON.stringify(playlist));
    return playlist;
  });
