<template>
  <div id="playbar_container">
    <vue-headful :title="titlebar"/> <!-- For title -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
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
    <v-card width="100%"  id="playbar" :height="card_height" class="animated slideInUp">
      <v-progress-linear :indeterminate="true" background-color="black lighten-3" color="white lighten-1" v-if="isLoading"></v-progress-linear>
      <v-progress-linear :indeterminate="false" background-color="black lighten-3" color="white lighten-1" v-if="!isLoading" :value="audioLength"></v-progress-linear>
      <v-layout style="height:100px;" row wrap>
        <v-flex xs4>
          <p style="padding-top:20px;">{{ title }}</p>
        </v-flex>
        <v-flex xs4>
          <div class="control_box">
            <i class="material-icons controls" title="Go back for 10 seconds" v-ripple @click="replayTrack" v-show="isPlaying">replay_10</i>
            <i class="material-icons controls" title="Pause the track" v-ripple @click="pauseTrack" v-show="isPlaying">pause</i>
            <i class="material-icons controls" title="Resume the track" v-ripple @click="resumePlay" v-show="!isPlaying">play_arrow</i>
            <i class="material-icons controls" title="Pass the track by 30 seconds" v-ripple @click="forwardTrack" v-show="isPlaying">forward_30</i>
          </div>
        </v-flex>
        <v-flex xs4 style="color:white;">
          <div class="control_box">
            <i class="material-icons controls" title="Open for more settings" v-ripple @click="openSettings">{{ settingsOpenIcon }}</i>
          </div>
        </v-flex>
      </v-layout>
      <v-layout style="height:100px;" row wrap>
        <v-flex xs4 style="color:white;">
          <v-slider
              v-model="volume"
              title="Control the volume"
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
        <v-flex xs4 style="color:white;">
          <div class="control_box">
            <i class="material-icons controls" title="Repeat this track" v-ripple @click="loopTrack" :style="isLooping ? 'color:#fff;' : 'color:#6b6b6b;'">repeat</i>
          </div>
        </v-flex>
        <v-flex xs4 style="color:white;">
          <div class="control_box" style="height:30px;">
            <google-cast-launcher v-pre></google-cast-launcher>
          </div>
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
      card_height: 100,
      settingsOpenIcon: "keyboard_arrow_down",
      snackbar: false,
      snackbar_text: "",
      isLooping: false
    }
  },
  computed: {
    isPlaying: function(){
      return Store_Play.isPlaying;
    },
    current_stream_url: function(){
      return Store_Play.current_stream_url;
    },
    title: function(){
      return Store_Play.title;
    },
    artist: function(){
      return Store_Play.artist;
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
    },
    titlebar: function(){
      if(this.title === ""){
        return "Stream";
      } else {
        return this.title + ' - ' + this.artist;
      }
    }
  },
  watch: {
    volume: function(val){
      this.audio.volume = val/100;
    },
    recent_stream_url: function(){
      window.cast_current_stream_url = this.recent_stream_url;
    },
    current_stream_url: function(){
      try{
        this.pauseTrack();
      } catch (e){
        //Nothing
      }
      this.audio = undefined;
      this.playTrack();
    }
  },
  mounted: function(){

  },
  created: function(){
    var global_this = this;
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32:
          if(global_this.isPlaying){
            global_this.pauseTrack();
          }else{
            global_this.resumePlay();
          }
          break;
        case 39:
          if(global_this.isPlaying){
            global_this.forwardTrack();
          }
          break;
        case 37:
          if(global_this.isPlaying){
            global_this.replayTrack();
          }
          break;
      }
    });
  },
  methods: {
    playTrack: function(){
      try{
        var outer_this = this;
        if(this.audio == undefined){
          try{
            this.audio.currentTime = 0;
            this.audio.pause();
          }catch(e){
            //Maybe first start
          }
          this.audio = new Audio(Store_Play.current_stream_url);

          this.audio.volume = this.volume/100;

          this.audio.addEventListener("timeupdate", function(){
            outer_this.audio_currentTime = outer_this.audio.currentTime;
            outer_this.audio_duration = outer_this.audio.duration;
          });

          //For system pause and play
          this.audio.onplay = function(){
            outer_this.resumePlay();
          }
          this.audio.onpause = function(){
            outer_this.pauseTrack();
          }

          this.recent_stream_url = Store_Play.current_stream_url;
        }
        this.audio.oncanplay = function(){
          outer_this.audio.play();

          //Load config from cookies
          var looping = window.$cookies.get("playbar_isLooping") == undefined ? false : window.$cookies.get("playbar_isLooping");
          if(looping == "true"){
            outer_this.loopTrack();
          }
        }
        setTimeout(function(){
          if(isNaN(outer_this.audio.duration)){
            outer_this.snackbar_text = "The track does not exist. Sorry for that.";
            outer_this.snackbar = true;
          }
        }, 3000);
      } catch(e){
        this.snackbar_text = "You haven't selected a track.";
        this.snackbar = true;
      }
    },
    loopTrack: function(){
      if(this.audio.loop){
        this.audio.loop = false;
      }else{
        this.audio.loop = true;
      }
      this.isLooping = this.audio.loop;
      window.$cookies.set("playbar_isLooping", this.audio.loop);
    },
    resumePlay: function(){
      this.playTrack();
      Mutations_Play.resumePlay();
    },
    replayTrack: function(){
      this.audio.currentTime -= 10;
    },
    forwardTrack: function(){
      this.audio.currentTime += 30;
    },
    pauseTrack: function(){
      Mutations_Play.stopPlay();
      this.audio.pause();
    },
    openSettings: function(){
      if(this.card_height == 100){
        this.card_height = 200
        this.settingsOpenIcon = "keyboard_arrow_up";
      } else {
        this.card_height = 100
        this.settingsOpenIcon = "keyboard_arrow_down";
      }
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
  /*margin-left: 80px;*/
  width: 100%;
  left:0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}

.control_box{
  margin-top:10px;
}

#playbar{
  background-color: #000;
  text-align: center;
  color:white;
}

.controls{
  cursor: pointer;
  font-size: 35px;
}
</style>
