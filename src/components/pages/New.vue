<template>
  <div id="new_releases" class="default">
    <v-item-group>
      <v-container grid-list-md>
        <div style="text-align:center;">
          <h2>New releases</h2>
        </div>
        <v-layout wrap>
          <v-flex
            v-for="track in new_tracks"
            :key="track.id"
            xs12
            sm6
            md4
            lg3
          >
            <Track :title="track.track_name" :cover="track.cover_path" :stream_url="track.track_path" :artist="track.artist" :release_date="track.release_date" class="animated flipInY" />
          </v-flex>
        </v-layout>
        <div style="text-align:center;margin-top:20px;">
          <h2>All tracks</h2>
        </div>
        <v-layout wrap>
          <v-flex
            v-for="track in all_tracks"
            :key="track.id"
            xs12
            sm6
            md4
            lg3
          >
            <Track :title="track.track_name" :cover="track.cover_path" :stream_url="track.track_path" :artist="track.artist" :release_date="track.release_date" class="animated flipInY" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import Track from '../elements/Track';
import { Endpoints } from "../../Endpoints";

export default {
  name: 'New',
  components: {
    Track
  },
  data: function(){
    return {
      new_tracks: [],
      all_tracks: []
    }
  },
  mounted: function(){
    let api_new_tracks = Endpoints.new_tracks;
    let api_all_tracks = Endpoints.all_tracks;
    this.axios.get(api_new_tracks).then((response) => {
      this.new_tracks = response.data.tracks;
    });
    this.axios.get(api_all_tracks).then((response) => {
      this.all_tracks = response.data.tracks;
    });
  }
}
</script>

<style>
#new_releases{
  margin-bottom: 200px;
}
</style>
