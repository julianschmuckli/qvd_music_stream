<template>
  <v-container grid-list-md>
    <v-text-field
      label="Search for tracks..."
      solo
      dark
      v-model="search_term"
      :loading="isLoading"
      elevation="15"
      class="selectable"
    ></v-text-field>
    <div v-if="search_term != ''">
      <v-list>
        <v-list-tile dark v-if="search_tracks == undefined || search_tracks.length == 0">
          <v-list-tile-content class="tile" style="text-align:center;padding-top:11px;">
            No results
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          dark
          v-for="track in search_tracks"
          :key="track.id"
        >
          <TrackList :title="track.track_name" :cover="track.cover_path" :stream_url="track.track_path" :artist="track.artist" />
        </v-list-tile>
      </v-list>
    </div>
  </v-container>
</template>

<script>
import TrackList from '../elements/TrackList';
import {Endpoints} from '../../Endpoints.js';

export default{
  name: "SearchBar",
  data: function(){
    return {
      search_term: "",
      search_tracks: [],
      isLoading: false
    }
  },
  watch: {
    search_term: function(){
      let api_search_tracks = Endpoints.search_tracks + this.search_term;
      this.isLoading = "#ffffff";
      this.axios.get(api_search_tracks).then((response) => {
        this.search_tracks = response.data.tracks;
        this.isLoading = false;
      });
    }
  },
  components: {
    TrackList
  }
}
</script>

<style>
</style>
