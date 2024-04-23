import Home from "../pages/Home.svelte";
import SignIn from "../pages/SignIn.svelte";
import UrlControl from "../pages/UrlControl.svelte";
import { pageStore } from "../stores/page";

export const openSignIn = function () {
  pageStore.set(SignIn);
};

export const openUrlControl = function () {
  pageStore.set(UrlControl);
};

export const openHome = function () {
  pageStore.set(Home);
};
