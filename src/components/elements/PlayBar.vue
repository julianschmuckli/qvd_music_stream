<template>
  <div id="playbar_container">
    <v-card width="100%"  id="playbar" height="100" class="animated slideInUp">
      <v-progress-linear :indeterminate="true" background-color="black lighten-3" color="white lighten-1" v-if="isLoading"></v-progress-linear>
      <p style="margin-top:20px;">{{ title }}</p>
      <p>
        <i class="material-icons controls" @click="resumePlay" v-if="!isPlaying">play_arrow</i>
        <i class="material-icons controls" @click="pauseTrack" v-if="isPlaying">pause</i>
      </p>
    </v-card>
  </div>
</template>

<script>
import {Store_Play, Mutations_Play} from "../services/Play.js";

export default {
  name: "PlayBar",
  data: function(){
    return {
      audio: undefined,
      recent_stream_url: undefined
    }
  },
  computed: {
    isPlaying: function(){
      if(Store_Play.isPlaying){
        this.playTrack();
      }
      return Store_Play.isPlaying;
    },
    current_stream_url: function(){
      return Store_Play.current_stream_url;
    },
    title: function(){
      return Store_Play.title;
    },
    isLoading: function(){
      return this.isPlaying && this.audio == undefined;
    }
  },
  methods: {
    playTrack: function(){
      if(this.recent_stream_url != Store_Play.current_stream_url){
        this.audio = new Audio(Store_Play.current_stream_url);
      }
      this.audio.play();
      this.recent_stream_url = Store_Play.current_stream_url;
    },
    resumePlay: function(){
      Mutations_Play.resumePlay();
    },
    pauseTrack: function(){
      Mutations_Play.stopPlay();
      this.audio.pause();
    },
    stopTrack: function(){
      this.audio.stop();
      this.audio = undefined;
    }
  }
}
</script>

<style>
#playbar_container{
  background-color: #303030;
  z-index: 200;
}

#playbar{
  background-color: #000;
  text-align: center;
  color:white;
}

.controls{
  cursor: pointer;
}
</style>
