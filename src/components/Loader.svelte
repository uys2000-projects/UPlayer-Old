<script lang="ts">
  export let dialog: HTMLDialogElement;
  export const show = () => dialog.showModal();
  export const hide = () => dialog.close();
  export let open: boolean = false;
</script>

<dialog bind:this={dialog} class="modal" {open}>
  <div
    class="modal-box relative max-w-full max-h-full w-full h-full flex flex-col justify-center items-center rounded-none"
  >
    <slot />
  </div>
</dialog>
