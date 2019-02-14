<template>
  <div id="new_releases" class="default">
    <v-item-group>
      <v-container grid-list-md>
        <div style="text-align:center;">
          <h2>New releases</h2>
        </div>
        <v-layout wrap>
          <v-flex
            v-for="n in 5"
            :key="n"
            xs12
            sm6
            md4
            lg3
          >
            <Track title="Take Your Pain Away (Extended Mix)" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import Track from '../elements/Track';

export default {
  name: 'New',
  components: {
    Track
  }
}
</script>

<style>

</style>
