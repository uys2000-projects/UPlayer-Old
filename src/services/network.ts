import { Network } from "@capacitor/network";

export const getNetworkStatus = async () => {
  return (await Network.getStatus()).connected;
};
