<template>
  <v-app>
    <!--<Navigation />-->
    <v-content>
      <New />
    </v-content>
    <PlayBar />
  </v-app>
</template>

<script>
import New from './components/pages/New';
import PlayBar from './components/elements/PlayBar';

export default {
  name: 'App',
  components: {
    New,
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
*{
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}
</style>
