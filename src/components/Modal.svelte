<script lang="ts">
  export let dialog: HTMLDialogElement;
  export const show = () => dialog.showModal();
  export const hide = () => dialog.close();
  export let open: boolean = false;
  export let backdrop: boolean = true;
  export let fixedSize: boolean = false;
</script>

<dialog bind:this={dialog} class="modal" {open}>
  <div
    class="modal-box relative flex flex-col overflow-hidden flex-nowrap {fixedSize
      ? 'w-90vw h-90vh'
      : '!max-w-[90vw] max-h-[90vh]'}"
    style="max-width: unset;"
  >
    <form method="dialog" class="absolute top-1 right-1">
      <button class="btn btn-error btn-xs btn-circle btn-outline">
        <span class="icon">close</span>
      </button>
    </form>
    <slot />
  </div>
  {#if backdrop}
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
