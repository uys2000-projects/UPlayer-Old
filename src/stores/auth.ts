import type { Auth } from "../models/auth";

import { writable } from "svelte/store";

export const authStore = writable(null as null | Auth);
