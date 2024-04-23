import type { Playlist, PlaylistItem } from "iptv-playlist-parser";

const en = /(S[\d]+ E[\d]+)|(s[\d]+ e[\d]+)/g;
const tr = /([\d]+.Bölüm)|([\d]+.Blm)|([\d]+.BLM)/g;

export class CustomPlaylistItem {
  url: string = "";
  logo: string = "";
  name: string = "";
  rawname: string = "";
  groupName: string = "";
  index: number = 0;

  getName() {
    const iEn = this.rawname.search(en);
    if (iEn != -1) return this.rawname.substring(0, iEn);

    const iTr = this.rawname.search(tr);
    if (iTr != -1) return this.rawname.substring(0, iTr);

    return this.rawname;
  }

  hasChannelUrl() {
    return this.url.search(/[.][^.\/]*$/) == -1;
  }
  hasEnglishSeriesName() {
    return this.rawname.search(en) != -1;
  }
  hasTurkishSeriesName() {
    return this.rawname.search(tr) != -1;
  }

  isChannel() {
    return this.hasChannelUrl();
  }
  isMovie() {
    return (
      !this.hasChannelUrl() &&
      !this.hasEnglishSeriesName() &&
      !this.hasTurkishSeriesName()
    );
  }
  isSeries() {
    return (
      !this.hasChannelUrl() &&
      (this.hasEnglishSeriesName() || this.hasTurkishSeriesName())
    );
  }

  group(playlistArray: CustomPlaylistItem[]) {
    return playlistArray.filter(
      (playlistItem) => playlistItem.groupName == this.groupName
    );
  }
  series(playlistArray: CustomPlaylistItem[]) {
    if (!this.isSeries()) return [this];
    return playlistArray.filter(
      (playlistItem) => playlistItem.getName() == this.getName()
    );
  }

  constructor(playlistItem: PlaylistItem) {
    this.url = playlistItem.url;
    this.logo = playlistItem.tvg.logo;
    this.rawname = playlistItem.name;
    this.name = this.getName();
    this.groupName = playlistItem.group.title;
    this.index = playlistItem.line;
  }
}

export class CustomPlaylist {
  items: CustomPlaylistItem[] = [];

  getGroups() {
    return [...new Set(this.items.map((item) => item.groupName))];
  }
  getGroupItems(name: string) {
    return this.items.filter((item) => item.groupName == name);
  }

  constructor(playlist: Playlist) {
    this.items = playlist.items.map(
      (playlistItem) => new CustomPlaylistItem(playlistItem)
    );
  }
}
