import "./start/ulogger";
import "./start/auth";
import "./start/playlist";

export default import("./start/svelte").then((res) => res?.default);
