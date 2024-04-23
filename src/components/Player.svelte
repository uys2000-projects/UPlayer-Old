<script lang="ts">
  import "video.js/dist/video-js.min.css";
  import "@videojs/themes/dist/fantasy/index.css";
  import videojs from "video.js";
  import type Player from "video.js/dist/types/player";

  let video: HTMLVideoElement;
  let player: Player;
  export const unload = () => {
    if (player) {
      player.src("");
      player.dispose();
    }
  };

  export const load = (url: string) => {
    if (url) {
      player = videojs(video);
      player.src(url);
    }
  };
</script>

<div class="player relative">
  <video
    id="video"
    class="video-js vjs-theme-fantasy w-screen h-screen"
    bind:this={video}
    controls
  >
    <track kind="captions" />
  </video>
  <slot />
</div>

<style>
  .player:target :global(.btn-video),
  .player:focus :global(.btn-video),
  .player:hover :global(.btn-video) {
    opacity: 1;
  }
</style>
