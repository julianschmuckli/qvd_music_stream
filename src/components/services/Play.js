import Vue from 'vue';

export const Store_Play = Vue.observable({
  current_stream_url: undefined,
  title: "",
  cover_path: "",
  artist: "",
  release_date: "",
  isPlaying: false
});

export const Mutations_Play = {
  startPlay: function(url){
    Store_Play.current_stream_url = url;
    Store_Play.isPlaying = true;
  },
  resumePlay: function(){
    Store_Play.isPlaying = true;
  },
  stopPlay: function(){
    Store_Play.isPlaying = false;
  },
  setTitle: function(title){
    Store_Play.title = title;
  },
  setCoverPath: function(cover_path){
    Store_Play.cover_path = cover_path;
  },
  setArtist: function(artist){
    Store_Play.artist = artist;
  },
  setReleaseDate: function(release_date){
    Store_Play.release_date = release_date;
  }
}
