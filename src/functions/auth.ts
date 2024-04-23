import { Auth } from "../models/auth";
import { AUTH } from "../models/constants";
import { getFile, setFile } from "../services/filesystem";
import { addDoc, getDoc, updateDoc } from "../services/firebase";

export const getAuth = async function () {
  try {
    const auth = await getFile<Auth>(AUTH);
    return auth;
  } catch {}
  return undefined;
};

export const signIn = async function (id: string) {
  try {
    const { data: auth } = await getDoc<Auth>(AUTH, id);
    await setFile(AUTH, JSON.stringify(auth));
    return auth;
  } catch {}
  return undefined;
};

export const signUp = async function () {
  try {
    const { data: auth } = await addDoc(AUTH, new Auth());
    await setFile(AUTH, JSON.stringify(auth));
    return auth;
  } catch {}
  return undefined;
};

export const updateAuth = async function (data: Auth) {
  try {
    await updateDoc(AUTH, data.id, data);
    return true;
  } catch {}
  return false;
};
