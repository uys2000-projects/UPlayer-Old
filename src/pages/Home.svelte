<script lang="ts">
  import Player from "../components/Player.svelte";
  import Modal from "../components/Modal.svelte";
  import PlayerMenu from "../components/PlayerMenu.svelte";
  import type { CustomPlaylistItem } from "../models/playlist";
  import LivePlayer from "../components/LivePlayer.svelte";

  let modal: Modal;
  let dialog: HTMLDialogElement;

  let isLive = false;

  let player: Player;
  let livePlayer: LivePlayer;

  let src: string;

  const unloadPlayer = function () {
    try {
      player.unload();
    } catch {}
  };
  const unloadLivePlayer = function () {
    try {
      livePlayer.unload();
    } catch {}
  };

  const itemChose = function (item: CustomPlaylistItem) {
    unloadPlayer();
    unloadLivePlayer();
    setTimeout(() => {
      src = item.url;
      isLive = item.isChannel();
      setTimeout(() => {
        if (isLive) livePlayer.load(item.url);
        else player.load(item.url);
      }, 200);
    }, 200);
  };
</script>

<div>
  <div>
    {#if isLive}
      <LivePlayer bind:this={livePlayer}>
        <button class="btn-video" on:click={modal.show}> Menu </button>
      </LivePlayer>
    {:else}
      <Player bind:this={player}>
        {#if src}
          <a class="btn-video" style="right:90px" href={src}> Download </a>
        {/if}

        <button class="btn-video" on:click={modal.show}>Menu</button>
      </Player>
    {/if}
  </div>
  <Modal {dialog} bind:this={modal} fixedSize>
    <PlayerMenu itemChoseEvent={itemChose} />
  </Modal>
</div>
