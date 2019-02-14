<template>
  <v-item style="margin-left:auto;margin-right:auto;">
      <v-card
        slot-scope="{ active, toggle }"
        :style="active ? 'opacity:0.5;' : ''"
        class="d-flex align-center"
        dark
        elevation="15"
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
.center_box{
  margin-left:auto;
  margin-right:auto;
}
</style>
