import Vue from 'vue';

export const Store_Play = Vue.observable({
  current_stream_url: undefined,
  isPlaying: false
});

export const Mutations_Play = {
  startPlay: function(url){
    Store_Play.current_stream_url = url;
    Store_Play.isPlaying = true;
  }
}
