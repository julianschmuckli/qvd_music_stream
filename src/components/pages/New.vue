<template>
  <div id="new_releases" class="default">
    <v-item-group>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex
            v-for="n in 3"
            :key="n"
            xs12
            md4
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
@import '../../assets/css/page.css';
</style>
