import { setDebugMode } from "u-logger";

setDebugMode(
  import.meta.env.VITE_DEBUG_MODE == "TRUE",
  import.meta.env.VITE_DEBUG_STRING_MODE == "TRUE"
);
