<template>
  <v-app dark>
    <!--<Navigation />-->
    <v-content>
      <SearchBar />
      <New />
    </v-content>
    <PlayBar />
  </v-app>
</template>

<script>
import New from './components/pages/New';
import PlayBar from './components/elements/PlayBar';
import SearchBar from './components/elements/SearchBar';

export default {
  name: 'App',
  components: {
    New,
    PlayBar,
    SearchBar
  },
}
</script>

<style>
@import './assets/css/page.css';
@import './assets/css/animate.css';

*:not(.material-icons){
  font-family: "Staatliches", sans-serif !important;
}
*:not(input){
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}
</style>
