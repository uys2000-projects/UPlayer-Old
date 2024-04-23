<script lang="ts">
  import type { CustomPlaylistItem } from "../models/playlist";
  import { playlistStore } from "../stores/playlist";

  let groupNames: string[];
  let groupItems: CustomPlaylistItem[];
  if ($playlistStore) {
    groupNames = $playlistStore.getGroups();
    groupItems = $playlistStore.getGroupItems(groupNames[0]);
  }

  let groupClickEvent = function (name: string) {
    if ($playlistStore) {
      groupItems = $playlistStore.getGroupItems(name);
    }
  };
  export let itemChoseEvent = function (item: CustomPlaylistItem) {};
</script>

{#if $playlistStore}
  <div
    class="player-menu overflow-hidden grow max-w-none flex flex-col flex-nowrap w-full h-full max-h-full"
  >
    <div
      class="carousel carousel-center max-w-full p-4 space-x-4 bg-accent text-accent-content rounded-box shrink-0"
    >
      {#each groupNames as name}
        <button
          class="btn glass carousel-item"
          on:click={() => groupClickEvent(name)}
        >
          {name}
        </button>
      {/each}
    </div>
    <div
      class="h-full overflow-x-auto flex-nowrap menu bg-base-200 w-full rounded-box"
    >
      {#each groupItems as item}
        <button
          class="btn glass carousel-item justify-start"
          on:click={() => itemChoseEvent(item)}
        >
          {item.index}:
          {item.name}
        </button>
      {/each}
    </div>
  </div>
{/if}
