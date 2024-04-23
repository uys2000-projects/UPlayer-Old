import type { Theme } from "daisyui";

export class Auth {
  id: string = "";
  url: string = "";
  theme: Theme | "" = "";
  created: Date = new Date();
  updated: Date = new Date();
}
