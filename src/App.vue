<template>
  <v-app>
    <Navigation />
    <v-content style="margin-left:80px;">
      <New />
    </v-content>
    <PlayBar />
  </v-app>
</template>

<script>
import New from './components/pages/New';
import Navigation from './components/main/Navigation';
import PlayBar from './components/elements/PlayBar';

export default {
  name: 'App',
  components: {
    New,
    Navigation,
    PlayBar
  },
}
</script>

<style>
@import './assets/css/page.css';
@import './assets/css/animate.css';

*:not(.material-icons){
  font-family: "Staatliches", sans-serif !important;
}
</style>
