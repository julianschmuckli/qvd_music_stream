<template>
  <v-app>
    <Navigation />
    <v-content style="margin-left:80px;">
      <New />
    </v-content>
  </v-app>
</template>

<script>
import New from './components/pages/New';
import Navigation from './components/main/Navigation';

export default {
  name: 'App',
  components: {
    New,
    Navigation
  },
}
</script>

<style>
@import './assets/css/page.css';

*:not(.material-icons){
  font-family: "Staatliches", sans-serif !important;
}
</style>
