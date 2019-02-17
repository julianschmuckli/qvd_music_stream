<template>
  <v-item class="track_outer">
      <v-card
        :style="card_style"
        class="d-flex"
        dark
        hover
        elevation="12"
        :height="card_height"
        width="200"
        @mouseenter="mouseOver"
        @mouseleave="mouseOver"
      >
      <div style="position:relative;top:200px;left:0;text-align:center;" v-if="active" class="animated fadeIn">
        <span>{{ title }}</span><br>
        <i class="material-icons">play_arrow</i> <i class="material-icons">cloud_download</i>
      </div>
      </v-card>
  </v-item>
</template>

<script>
export default {
  name: 'Track',
  props:{
    title: String,
    cover: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/07/19/11/05/panels-851426_960_720.jpg"
    }
  },
  data: function(){
    return {
      active: false,
      card_height: 200
    }
  },
  computed: {
    card_style: function(){
      return "background-image:url('" + this.cover + "');background-size:200px 200px;transition: height 0.3s;";
    }
  },
  methods: {
    mouseOver: function(){
      this.active = !this.active;
      if(this.active){
        this.card_height = 250;
      }else{
        this.card_height = 200;
      }
    }
  }
}
</script>

<style>
.track_outer{
  margin-left:auto;
  margin-right:auto;
  margin-top:30px;
}
</style>
