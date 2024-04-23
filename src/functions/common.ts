import { loaderStore } from "../stores/loader";

export const parse = function <T>(data: string) {
  return JSON.parse(data) as T;
};

export const submitPrevent = async function <T>(
  event: SubmitEvent,
  callback: (...args: any) => T,
  dontCloseLoader: boolean = false
): Promise<Awaited<T>> {
  loaderStore.set(true);
  event.preventDefault();
  const res = await callback(event);
  if (!dontCloseLoader) loaderStore.set(false);
  return res;
};

export const tryCatch = function <T>(
  callback: (...args: any) => T,
  err?: (...args: any) => any
) {
  try {
    return callback();
  } catch {
    if (err) return err();
  }
};
