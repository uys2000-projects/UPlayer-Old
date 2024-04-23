import { writable } from "svelte/store";
import Blank from "../pages/Blank.svelte";

export const pageStore = writable(Blank as ConstructorOfATypedSvelteComponent);
