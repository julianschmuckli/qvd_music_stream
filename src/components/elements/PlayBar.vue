<template>
  <div id="playbar_container">
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ snackbar_text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card width="100%"  id="playbar" height="100" class="animated slideInUp">
      <v-progress-linear :indeterminate="true" background-color="black lighten-3" color="white lighten-1" v-if="isLoading"></v-progress-linear>
      <v-progress-linear :indeterminate="false" background-color="black lighten-3" color="white lighten-1" v-if="!isLoading" :value="audioLength"></v-progress-linear>
      <v-layout row wrap>
        <v-flex xs4>
          <p style="padding-top:20px;">{{ title }}</p>
        </v-flex>
        <v-flex xs4>
          <div id="control_box">
            <i class="material-icons controls" v-ripple @click="replayTrack" v-if="isPlaying">replay_10</i>
            <i class="material-icons controls" v-ripple @click="pauseTrack" v-if="isPlaying">pause</i>
            <i class="material-icons controls" v-ripple @click="resumePlay" v-if="!isPlaying">play_arrow</i>
            <i class="material-icons controls" v-ripple @click="forwardTrack" v-if="isPlaying">forward_30</i>
          </div>
        </v-flex>
        <v-flex xs4 style="color:white;">
          <v-slider
              v-model="volume"
              append-icon="volume_up"
              prepend-icon="volume_down"
              color="#FFF"
              track-color="#FFF"
              thumb-color="#FFF"
              light
              min="0"
              max="100"
            ></v-slider>
        </v-flex>
      </v-layout>
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
      audio_currentTime: 0,
      audio_duration: 0,
      recent_stream_url: undefined,
      volume: 50,
      snackbar: false,
      snackbar_text: ""
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
    },
    audioLength: function(){
      try{
        return (this.audio_currentTime / this.audio_duration) * 100;
      }catch(e){
        return 0;
      }
    }
  },
  watch: {
    volume: function(val){
      this.audio.volume = val/100;
    }
  },
  methods: {
    playTrack: function(){
      try{
        if(this.recent_stream_url != Store_Play.current_stream_url){
          this.audio = new Audio(Store_Play.current_stream_url);
        }
        this.audio.volume = this.volume/100;
        this.audio.play();

        var outer_this = this;
        this.audio.addEventListener("timeupdate", function(){
          outer_this.audio_currentTime = outer_this.audio.currentTime;
          outer_this.audio_duration = outer_this.audio.duration;
        });
        this.recent_stream_url = Store_Play.current_stream_url;
      } catch(e){
        this.snackbar_text = "You haven't selected a track.";
        this.snackbar = true;
      }
    },
    resumePlay: function(){
      Mutations_Play.resumePlay();
    },
    replayTrack: function(){
      this.audio.currentTime -= 10;
      this.audio.play();
    },
    forwardTrack: function(){
      this.audio.currentTime += 30;
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
  position:fixed;
  bottom:0;
  width:100%;
  left:0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}

#control_box{
  margin-top:10px;
}

#playbar{
  background-color: #000;
  text-align: center;
  color:white;
}

.controls{
  cursor: pointer;
  font-size: 40px;
}
</style>
