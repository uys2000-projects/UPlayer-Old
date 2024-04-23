<script lang="ts">
  import Mpegts from "mpegts.js";

  let player: Mpegts.Player;
  let video: HTMLVideoElement;
  let type: "mse" | "mpegts" | "m2ts" | "flv" = "mse";
  let coreUrl: string;
  export const unload = () => {
    player.pause();
    player.unload();
    player.destroy();
  };

  export const createPlayer = (url: string) => {
    if (Mpegts.getFeatureList().mseLivePlayback && url) {
      player = Mpegts.createPlayer({
        type: type,
        isLive: true,
        url: url,
      });
      player.attachMediaElement(video);
      player.load();
      player.play();
    }
  };
  export const load = (url: string) => {
    coreUrl = url;
    createPlayer(url);
  };
</script>

<div class="player relative">
  <video
    id="video"
    bind:this={video}
    class="video-js vjs-theme-fantasy w-screen h-screen"
    controls
  >
    <track kind="captions" />
  </video>
  <select
    class="select select-xs absolute top-5 left-5 opacity-0"
    bind:value={type}
    on:change={() => {
      player.pause();
      player.unload();
      player.destroy();
      createPlayer(coreUrl);
    }}
  >
    <option>mse</option>
    <option>mpegts</option>
    <option>m2ts</option>
    <option>flv</option>
  </select>
  <slot />
</div>

<style>
  .player:target :global(.btn-video),
  .player:focus :global(.btn-video),
  .player:hover :global(.btn-video) {
    opacity: 1;
  }
  .player:target .select,
  .player:focus .select,
  .player:hover .select {
    opacity: 0.5;
  }
</style>
