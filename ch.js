// Change "{}" to your options:
// https://github.com/sampotts/plyr/#options
const player = new Plyr('#player', {
	controls: [
		'play-large',
		'play',
		'progress',
		'volume',
		'mute',
		'fullscreen'
	]
});

// Expose player so it can be used from the console
window.player = player;

var liveFrame = $('#video-frame');
//var livePlayer = $('#player');
var player;
var KEY = "AIzaSyCXluahYK-tkCGNjt4Fj4XWCecCEwFaag8";
//var CHANNEL= "UC0u6gAESA0XmSJQaAyDTTVg";
var CHANNEL= "UCmfrgIMBYXMv3J2VstA5XVw";
//var plyr = new Plyr();

function getVideo() {
    var videoPlaylist = Array();
    var scheduledVideos = Array(); 
    var videoIDs = "";
    $.ajax({
        dataType: "json",
        url: ('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&channelId=' + CHANNEL + '&type=video&order=date&orderby=time&key=' + KEY),
        async: false,
        success: function(Playlist) {
            Playlist.items.forEach(function(element) {
                //console.log(element);
              var count =1;
                if ((count > 20) || 
                    (element.snippet.liveBroadcastContent != "upcoming") || 
                    (element.snippet.liveBroadcastContent == "live")) 
                {
                     videoPlaylist.push({"id":element.id.videoId,
                                         "title":element.snippet.title,
                                         "description":element.snippet.description,
                                         "thumbnail":element.snippet.thumbnails.medium.url});
                    //console.log(videoIDs);
                    count +=1;
                } 
            });
          setupVideo(videoPlaylist)
        }
    })
}

function setupVideo(arr){
  //console.log(arr);
  var list="";
  $("#player").attr('data-plyr-embed-id', arr[0].id );
  player = new Plyr('#player', {settings: []});  
  var t =  decodeURIComponent(arr[0].description);
  var s = t.match(/\D+|\d+/g);
  t = "";
  if(s!=null){
    for (var i = 1; i < s.length; i+=2) { 
      t += s[i-1] + s[i] + "<br>";
    }
  }
  $("#frame-container .title").html(decodeURIComponent(arr[0].title));
  $("#frame-container .description").html(t);
  $.each( arr, function( key, element ) {
    list += '<div class="col-xs-10 col-sm-6 col-md-4 col-lg-3 video-select" data-video-id="' + element.id + '">';
    list += '<a href="#frame-container" class="item-box">';
    list += '<img width="100%" src="' + element.thumbnail + '" alt="' + decodeURIComponent(element.title) + '">';
    list += '<div class="item">';
    list += '<h3 class="title">' + decodeURIComponent(element.title) + '</h3>';
    var t =  decodeURIComponent(element.description);
    var s = t.match(/\D+|\d+/g);
    t = "";
    if(s!=null){
      for (var i = 1; i < s.length; i+=2) { 
          t += s[i-1] + s[i] + "<br>";
      }
    }
    //console.log(t);
    list += '<p class="description">' + t + '</p>';
    list += '</div></a></div>';
  })
  
  $(list).insertAfter($("#recent-videos"));
   $(".video-select").click(function(){
     player.destroy();
     $(".video-select").removeClass("selected");
     $(this).addClass("selected");
     //$("#video-frame").attr('src', "https://www.youtube.com/embed/"+$(this).data("video-id"));
     $("#player").attr('data-plyr-embed-id', $(this).data("video-id"));
     //player = plyr.setup('#player')[0];
     player = new Plyr('#player', {settings: []});
     $("#frame-container .title").html($(this).find(".title").html());
     $("#frame-container .description").html($(this).find(".description").html());
  })
}



$(document).ready(function(){
  // Add smooth scrolling to all links
  getVideo();
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

//<![CDATA[
  // 

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  // For more options see: https://github.com/sampotts/plyr/#options
  // captions.update is required for captions to work with hls.js
  const player = new Plyr(video, { captions: { active: true, update: true, language: 'en' } });
  if (!Hls.isSupported()) {
    video.src = source;
  } else {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    window.hls = hls;
    // Handle changing captions
    player.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
    });
  }

{
  enabled: !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}

  // Expose player so it can be used from the console
  window.player = player;



player.source = {
    // type: 'audio',
    type: 'video',
    title: '新播放',
    sources: data,
};

player.on('qualitychange', event => {
    $.each(data, function () {
        initData();
    })
});

function initData () {
    const video = document.querySelector('video');
    $.each(data, function () {
        // hls Adaptation
        if (this.mode === 'hls' && this.size === player.config.quality.selected) {
            // For more options see: https://github.com/sampotts/plyr/#options
            // captions.update is required for captions to work with hls.js
            if (!Hls.isSupported()) {
                video.src = this.src;
            } else {
                const hls = new Hls();
                hls.loadSource(this.src);
                hls.attachMedia(video);
                window.hls = hls;
                // Handle changing captions
                player.on('languagechange', () => {
                    // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                    setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                });
            }

            // Expose player so it can be used from the console
            window.player = player;
            return false;
        }
        // dash Adaptation
        if (this.mode === 'mpd' && this.size === player.config.quality.selected) {
            // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
            const dash = dashjs.MediaPlayer().create();
            dash.initialize(video, this.src, true);
            // Expose player and dash so they can be used from the console
            window.player = player;
            window.dash = dash;
        }
    })
}
initData();


});


//]]>


document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  // For more options see: https://github.com/sampotts/plyr/#options
  // captions.update is required for captions to work with hls.js
  const player = new Plyr(video, { captions: { active: true, update: true, language: 'en' } });
  if (!Hls.isSupported()) {
    video.src = source;
  } else {
    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();
    hls.loadSource(source);
    hls.attachMedia(video);
    window.hls = hls;
    // Handle changing captions
    player.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
    });
  }

{
  enabled: !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}

  // Expose player so it can be used from the console
  window.player = player;


player.source = {
    // type: 'audio',
    type: 'video',
    title: '新播放',
    sources: data,
};

player.on('qualitychange', event => {
    $.each(data, function () {
        initData();
    })
});

function initData () {
    const video = document.querySelector('video');
    $.each(data, function () {
        // hls Adaptation
        if (this.mode === 'hls' && this.size === player.config.quality.selected) {
            // For more options see: https://github.com/sampotts/plyr/#options
            // captions.update is required for captions to work with hls.js
            if (!Hls.isSupported()) {
                video.src = this.src;
            } else {
                const hls = new Hls();
                hls.loadSource(this.src);
                hls.attachMedia(video);
                window.hls = hls;
                // Handle changing captions
                player.on('languagechange', () => {
                    // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
                    setTimeout(() => hls.subtitleTrack = player.currentTrack, 50);
                });
            }

            // Expose player so it can be used from the console
            window.player = player;
            return false;
        }
        // dash Adaptation
        if (this.mode === 'mpd' && this.size === player.config.quality.selected) {
            // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
            const dash = dashjs.MediaPlayer().create();
            dash.initialize(video, this.src, true);
            // Expose player and dash so they can be used from the console
            window.player = player;
            window.dash = dash;
        }
    })
}
initData();


});




  window.onload = function() {
  Particles.init({
    // normal options
    selector: ".background",
    maxParticles: 450,
    color: "#090979",
    // options for breakpoints
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 200,
          color: "#000000",
          connectParticles: false
        }
      },
      {
        breakpoint: 425,
        options: {
          maxParticles: 100,
          connectParticles: true
        }
      },
      {
        breakpoint: 320,
        options: {
          maxParticles: 0

          // disables particles.js
        }
      }
    ]
  });
};

const player = new Plyr('#player');

