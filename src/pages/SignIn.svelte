<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import { submitPrevent } from "../functions/common";
  import { signIn, signUp } from "../functions/auth";
  import { authStore } from "../stores/auth";
  import type { Auth } from "../models/auth";
  import { openUrlControl } from "../functions/page";

  let id: string;
  let modal: Modal;
  let dialog: HTMLDialogElement;

  let error: boolean;

  const submitError = async function () {
    error = true;
    modal.show();
  };
  const submitSuccess = async function (auth: Auth) {
    error = false;
    modal.show();
    setTimeout(() => {
      modal.hide();
      authStore.set.logger(auth);
      setTimeout(openUrlControl, 200);
    }, 1500);
  };

  const signInSubmit = async function () {
    const auth = await signIn.pLogger(id);
    if (auth == null) submitError();
    else submitSuccess(auth);
  };

  const signUpSubmit = async function () {
    const auth = await signUp.pLogger();
    if (auth == null) submitError();
    else submitSuccess(auth);
  };
</script>

<div class="flex flex-col m-auto gap-2">
  <form
    class="flex flex-col m-auto gap-2"
    on:submit={(e) => submitPrevent(e, signInSubmit)}
  >
    <input
      bind:value={id}
      type="text"
      placeholder="Id"
      class="input input-bordered w-full max-w-xs"
    />
    <button type="submit" class="btn w-full">Sign In</button>
  </form>
  <form on:submit={(e) => submitPrevent(e, signUpSubmit)}>
    <button type="submit" class="btn w-full">Sign Up</button>
  </form>
  <Modal {dialog} bind:this={modal}>
    {#if error}
      Unscuccessfull
    {:else}
      Successfull
    {/if}
  </Modal>
</div>
