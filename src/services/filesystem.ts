import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { parse } from "../functions/common";

export const getFiles = async function (path: string) {
  return await Filesystem.readdir({
    path: path,
    directory: Directory.Documents,
  }).then((res) => res.files);
};
export const getFile = async function <T>(name: string) {
  return await Filesystem.readFile({
    path: name,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  }).then(({ data }) => parse<T>(data as string));
};

export const setFile = async function (name: string, data: string) {
  return await Filesystem.writeFile({
    path: name,
    data: data,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

export const addToFile = async function (name: string, data: string) {
  return await Filesystem.appendFile({
    path: name,
    data: data,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
};

export const removeFile = async function (name: string) {
  return await Filesystem.deleteFile({
    path: name,
    directory: Directory.Documents,
  });
};

export const setDir = async function (name: string) {
  return await Filesystem.mkdir({
    path: name,
    directory: Directory.Documents,
  });
};
export const removeDir = async function (name: string) {
  return await Filesystem.rmdir({
    path: name,
    directory: Directory.Documents,
  });
};
