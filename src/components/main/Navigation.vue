<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    dark
    style='background-color:black;position:fixed;left:0;top:0;height:100vh;'
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://qvd-music.com/logo.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Quinten van der Dam</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      drawer: true,
      items: [
        { title: 'New', icon: 'new_releases' },
        { title: 'All Tracks', icon: 'playlist_play' }
      ],
      mini: true,
      right: null
    }
  }
}
</script>
