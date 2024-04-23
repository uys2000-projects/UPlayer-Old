<script lang="ts">
  import { loaderStore } from "./stores/loader";
  import Loader from "./components/Loader.svelte";
  import { pageStore } from "./stores/page";
  let modal: Loader;
  let dialog: HTMLDialogElement;
</script>

<svelte:component this={$pageStore} />

<Loader {dialog} bind:this={modal} open={$loaderStore}>
  <span class="loading loading-infinity w-24"></span>
  <div class="flex items-end text-2xl=">
    <span>Loading</span>
    <span class="loading loading-dots loading-xs -mb1-px"></span>
  </div>
</Loader>
