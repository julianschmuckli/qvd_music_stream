<template>
  <div role="listitem">
    <v-list-tile-action class="tile">
      <v-icon @click="playTrack">play_arrow</v-icon>
    </v-list-tile-action>

    <v-list-tile-content class="tile">
      <v-list-tile-title v-text="this.title"></v-list-tile-title>
      <v-list-tile-sub-title v-text="this.artist"></v-list-tile-sub-title>
    </v-list-tile-content>
  </div>
</template>

<script>
import {Mutations_Play} from "../services/Play.js";

export default {
  name: 'TrackList',
  props:{
    title: String,
    cover: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/07/19/11/05/panels-851426_960_720.jpg"
    },
    artist: String,
    stream_url: String
  },
  methods: {
    playTrack: function(){
      Mutations_Play.startPlay(this.stream_url);
      Mutations_Play.setTitle(this.title);
      Mutations_Play.setCoverPath(this.cover_path);
      Mutations_Play.setArtist(this.artist);
    },
    downloadTrack: function() {
      location.href = this.stream_url;
    }
  }
}
</script>
<style>
.tile{
  display:inline-block;
  vertical-align: top;
}
</style>
