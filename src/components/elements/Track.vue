<template>
  <v-item class="track_outer">
      <v-card
        slot-scope="{ active, toggle }"
        :style="active ? 'opacity:0.5' : ''"
        class="d-flex align-center"
        dark
        hover
        elevation="12"
        height="200"
        width="200"
        @click="toggle"
        style="background-image:url('https://i1.sndcdn.com/artworks-000485899176-e28rdl-t500x500.jpg');background-size:cover;"
      >
        <v-scroll-y-transition>
          <div
            v-if="active"
            class="text-xs-center"
          >
            <p>{{ title }}</p>
            <i class="material-icons">play_arrow</i> <i class="material-icons">cloud_download</i>
          </div>
        </v-scroll-y-transition>
      </v-card>
  </v-item>
</template>

<script>
export default {
  name: 'Track',
  props:{
    title: String
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
