import { writable } from "svelte/store";

import type { CustomPlaylist } from "../models/playlist";

export const playlistStore = writable(null as null | CustomPlaylist);
