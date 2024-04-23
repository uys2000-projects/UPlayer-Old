import { initializeApp } from "firebase/app";
import {
  collection,
  doc as document,
  getDoc as getDoc_,
  getDocs as getDocs_,
  addDoc as addDoc_,
  setDoc as setDoc_,
  updateDoc as updateDoc_,
  getFirestore,
  deleteDoc,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import { Data, FirebaseData } from "../models/common";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
};

console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getData = (data: object) => JSON.parse(JSON.stringify(data));

const returnData = <T extends Data>(snapshot: DocumentData) =>
  new FirebaseData<T>(snapshot);

const returnDataMany = <T extends Data>(snapshot: QuerySnapshot) =>
  snapshot.docs.map(returnData<T>);

export const getDocs = function <T extends Data>(col: string) {
  const colRef = collection(db, col);
  return getDocs_(colRef).then(returnDataMany<T>);
};

export const getDoc = function <T extends Data>(col: string, doc: string) {
  const docRef = document(db, col, doc);
  return getDoc_(docRef).then(returnData<T>);
};

export const addDoc = function <T extends Data>(col: string, data: T) {
  const colRef = collection(db, col);
  return addDoc_(colRef, getData(data))
    .then((res) => ({ ...data, id: res.id } as T))
    .then((res) => ({ id: res.id, data: res }));
};

export const setDoc = function (col: string, doc: string, data: object) {
  const docRef = document(db, col, doc);
  return setDoc_(docRef, getData(data));
};

export const updateDoc = function (col: string, doc: string, data: object) {
  const docRef = document(db, col, doc);
  return updateDoc_(docRef, getData(data));
};

export const removeDoc = function (col: string, doc: string) {
  const docRef = document(db, col, doc);
  return deleteDoc(docRef);
};
