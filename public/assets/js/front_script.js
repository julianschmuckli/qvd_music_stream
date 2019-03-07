if(navigator.onLine){ //Check if it is connected to the internet
  window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
      initializeCastApi();
    }
  };
  initializeCastApi = function() {
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: "9B008F41",
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    var cast_last_current_stream_url = undefined;
    setInterval(function(){
      if(window.cast_current_stream_url != undefined && window.cast_current_stream_url != cast_last_current_stream_url){
        try{
          startCastSession();
        }catch(e){}
      }
      cast_last_current_stream_url = window.cast_current_stream_url;
    }, 1000); //Check for updates to submit
  };

  function startCastSession(){
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    var mediaInfo = new chrome.cast.media.MediaInfo("https://stream.qvd-music.com/"+window.cast_current_stream_url, "audio/wav");
    mediaInfo.metadata = new chrome.cast.media.MusicTrackMediaMetadata()
    mediaInfo.metadata.title = window.cast_current_title;
    mediaInfo.metadata.songName = window.cast_current_title;
    mediaInfo.metadata.artist = window.cast_current_artist;
    mediaInfo.metadata.artistName = window.cast_current_artist;
    mediaInfo.metadata.albumArtist = window.cast_current_artist;
    mediaInfo.metadata.subtitle = window.cast_current_artist;
    mediaInfo.metadata.releaseDate = window.cast_current_release_date;

    var image = new chrome.cast.Image(window.cast_current_cover_path);
    mediaInfo.metadata.images = [image];
    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    castSession.loadMedia(request).then(
      function() {
        //Load successful
        eventFire(document.getElementById('pause_track'), 'click');
      },
      function(errorCode) { console.log('Error code: ' + errorCode); });
  }

  function eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
} else {
  //Show offline dialog
  document.getElementById("offline").style.display = "block";
}
