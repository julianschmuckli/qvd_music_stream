# QVD Stream
This is an application, which originally plays all the tracks from the DJ and producer Quinten van der Dam (QVD). The project in the end was it, to build an own independent "streaming service" to provide the full quality of sound, since big players like Soundcloud or Spotify are compressing and reducing the audio files.

This repository can be used for free by every artist. For more details about the license, read below.

This web tool has been fully written in [Vue.js 2](https://vuejs.org/) and uses the [Vuetify](https://vuetifyjs.com/) library.

## Demo
If you want to see a demo of this project, follow the link here: [stream.qvd-music.com](https://stream.qvd-music.com/)

## How to install it myself
If you want to create a copy on your local to create your own stream service:

```bash
git clone https://github.com/julianschmuckli/qvd_music_stream.git # Clone the repo
npm install # Install the dependencies
npm run serve # Preview the app locally
npm run build # Make files ready for production
```
After you have run the project, please make sure that you provide also your own **Backend** for your own tracks. By default it is using the backend of stream.qvd-music.com. You find some documentation for the [Backend APIs in the Wiki](https://github.com/julianschmuckli/qvd_music_stream/wiki/Backend-APIs) of this repository.

## License
This project is licensed under the Apache-2.0 License. Please feel free to use this project for your own or use part of it, as long as you give credits to this repository.
