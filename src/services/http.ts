import { CapacitorHttp } from "@capacitor/core";

export const get = async function (url: string) {
  return await CapacitorHttp.get({ url: url });
};
