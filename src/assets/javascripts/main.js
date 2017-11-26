// import Amber from 'amber'

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector('.js-msnry')) {
    var grid = new Muuri('.msnry', {
      items: '.msnry-item',
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    });
  }


  if (document.querySelector('.js-gmap')) {
    var mapOptions = {
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: new google.maps.LatLng(0, 0)
    };
    var map = new google.maps.Map(document.querySelector('.js-gmap'), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(48.923564, 24.711256),
      icon: {
        path: "M21.216.014C10.26.397 1.156 8.924.106 19.804-.11 21.982.013 24.09.398 26.11c0 0 .033.235.146.687.34 1.51.848 2.977 1.48 4.352 2.206 5.21 7.306 13.926 18.75 23.41.7.587 1.73.587 2.44 0 11.444-9.472 16.544-18.19 18.76-23.422.644-1.376 1.142-2.83 1.48-4.353.103-.44.148-.688.148-.688.26-1.353.396-2.74.396-4.16C44 9.553 33.722-.427 21.216.013zM22 34c-6.076 0-11-4.924-11-11s4.924-11 11-11 11 4.924 11 11-4.924 11-11 11z",
        fillColor: '#FF0D35',
        fillOpacity: 1,
        anchor: new google.maps.Point(22, 55),
        strokeWeight: 0
      },
      map: map
    });
    map.panTo(marker.getPosition());
  }

  var menu = document.querySelector('.js-menu');
  document.querySelector('.js-open-menu').addEventListener('click', function(e) {
      e.preventDefault();
      menu.classList.add("is-active");
  });

  document.querySelector('.js-close-menu').addEventListener('click', function(e) {
      e.preventDefault();
      menu.classList.remove("is-active");
  });


  setTimeout(() => {
    var object = document.querySelector(".nav-home-logo");
    if (!object) return
    var logo = object.contentDocument.getElementsByTagName("path")[0];
    logo.setAttribute("fill", "#131313");

  }, 100);


  document.addEventListener("mouseover", function (e) {
    if (e.target && e.target.classList.contains("js-play")) {
      const player = e.target.parentElement.querySelector(".js-player");
      player.classList.add('is-active');
      player.currentTime = 0;
      player.play();
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target && e.target.classList.contains("js-play")) {
      const player = e.target.parentElement.querySelector(".js-player");
      player.classList.remove('is-active');
      player.pause();
    }
  });

});
