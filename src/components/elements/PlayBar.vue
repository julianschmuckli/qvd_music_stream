<template>
  <div id="playbar_container">
    <v-card width="100%"  id="playbar" height="100" class="animated slideInUp">
      <p>{{ isPlaying }}</p>
    </v-card>
  </div>
</template>

<script>
import {Store_Play} from "../services/Play.js";

export default {
  name: "PlayBar",
  data: function(){
    return {

    }
  },
  computed: {
    isPlaying: function(){
      return Store_Play.isPlaying;
    }
  }
}
</script>

<style>
#playbar_container{
  background-color: #303030;
}

#playbar{
  background-color: #000;
}
</style>
