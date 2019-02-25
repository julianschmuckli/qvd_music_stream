<template>
  <v-container grid-list-md>
    <v-text-field
      label="Search for tracks..."
      solo
      dark
      v-model="search_term"
      :loading="isLoading"
      elevation="15"
    ></v-text-field>
    <v-layout wrap v-if="search_term != ''">
      <v-flex
        v-for="track in search_tracks"
        :key="track.id"
        xs12
        sm6
        md4
        lg3
      >
        <Track :title="track.track_name" :cover="track.cover_path" :stream_url="track.track_path" :artist="track.artist" class="animated fadeIn" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Track from '../elements/Track';

export default{
  name: "SearchBar",
  data: function(){
    return {
      search_term: undefined,
      search_tracks: undefined,
      isLoading: false
    }
  },
  watch: {
    search_term: function(){
      let api_search_tracks = "https://qvd-music.com/backend/stream/tracks/search.php?q=" + this.search_term;
      this.isLoading = true;
      this.axios.get(api_search_tracks).then((response) => {
        this.search_tracks = response.data.tracks;
        this.isLoading = false;
      });
    }
  },
  components: {
    Track
  }
}
</script>

<style>
</style>
