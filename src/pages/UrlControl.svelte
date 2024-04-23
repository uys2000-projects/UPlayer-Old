<script lang="ts">
  import Modal from "../components/Modal.svelte";
  import { submitPrevent } from "../functions/common";
  import { authStore } from "../stores/auth";
  import { updateAuth } from "../functions/auth";
  import type { Auth } from "../models/auth";

  let url: string;
  let modal: Modal;
  let dialog: HTMLDialogElement;

  let error: boolean;

  const submitError = async function () {
    error = true;
    modal.show();
  };
  const submitSuccess = async function (auth: Auth) {
    error = false;
    authStore.set.logger(auth);
  };

  const saveUrlSubmit = async function () {
    if ($authStore) {
      const auth = { ...$authStore };
      auth.url = url;
      const result = await updateAuth(auth);
      if (!result) submitError();
      else submitSuccess(auth);
    }
  };
</script>

<div class="flex flex-col m-auto gap-2">
  <form
    class="flex flex-col m-auto gap-2"
    on:submit={(e) => submitPrevent(e, saveUrlSubmit, true)}
  >
    <input
      bind:value={url}
      type="url"
      placeholder="M3u Url"
      class="input input-bordered w-full max-w-xs"
    />
    <button type="submit" class="btn w-full">Save Url</button>
  </form>
  <Modal {dialog} bind:this={modal}>
    {#if error}
      Unscuccessfull
    {:else}
      Successfull
    {/if}
  </Modal>
</div>
