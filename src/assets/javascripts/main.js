// import Amber from 'amber'
import Swipejs from 'swipejs'
import Muuri from 'muuri'
// TODO: barba.js
import LazyLoad from './lazyload.js'
import loadScript from './loadScript.js'

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    // grid
    const msnryContainer = document.querySelector('.js-msnry')
    if (msnryContainer) {
      msnryContainer.classList.add('js-activated')

      new Muuri('.msnry', {
        items: '.msnry-item',
        layout: {
          fillGaps: true,
          horizontal: false,
          alignRight: false,
          alignBottom: false,
          rounding: false
        }
      })
    }

    // GMAP
    const gmapsEls = document.querySelectorAll('.js-gmap')
    if (gmapsEls.length) {
      // https://maps.googleapis.com/maps/api/staticmap?center=48.923564,%2024.711256&zoom=17&size=1000x500&format=jpg?&style=feature:road.local%7Celement:geometry%7Ccolor:0x00ff00&style=feature:landscape%7Celement:geometry.fill%7Ccolor:0x000000&style=element:labels%7Cinvert_lightness:true&style=feature:road.arterial%7Celement:labels%7Cinvert_lightness:false
      loadScript('http://maps.google.com/maps/api/js', () => {
        gmapsEls.forEach(el => {
          var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(0, 0)
          }
          var map = new google.maps.Map(el, mapOptions)
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(48.923564, 24.711256),
            icon: {
              path: 'M21.216.014C10.26.397 1.156 8.924.106 19.804-.11 21.982.013 24.09.398 26.11c0 0 .033.235.146.687.34 1.51.848 2.977 1.48 4.352 2.206 5.21 7.306 13.926 18.75 23.41.7.587 1.73.587 2.44 0 11.444-9.472 16.544-18.19 18.76-23.422.644-1.376 1.142-2.83 1.48-4.353.103-.44.148-.688.148-.688.26-1.353.396-2.74.396-4.16C44 9.553 33.722-.427 21.216.013zM22 34c-6.076 0-11-4.924-11-11s4.924-11 11-11 11 4.924 11 11-4.924 11-11 11z',
              fillColor: '#FF0D35',
              fillOpacity: 1,
              anchor: new google.maps.Point(22, 55),
              strokeWeight: 0
            },
            map: map
          })
          map.panTo(marker.getPosition())
        })
      })
    }

    // MENU
    var menu = document.querySelector('.js-menu')
    document
      .querySelector('.js-open-menu')
      .addEventListener('click', function (e) {
        e.preventDefault()
        menu.classList.add('is-active')
      })
    document
      .querySelector('.js-close-menu')
      .addEventListener('click', function (e) {
        e.preventDefault()
        menu.classList.remove('is-active')
      })

    // fix position for contacts page
    ;
    (() => {
      var contactsText = document.querySelector('.js-contacts-text')
      if (!contactsText) return
      const homeLink = document.querySelector('.main-nav-link.link-home')

      function fixPosition() {
        if (window.innerWidth > 1023) {
          const left = homeLink.getBoundingClientRect().x
          contactsText.setAttribute('style', `padding-left: ${left}px`)
        } else {
          contactsText.removeAttribute('style')
        }
      }
      fixPosition()

      let resizeTimer
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(fixPosition, 100)
      })
    })()

    // FIX logo color
    ;
    (() => {
      var object = document.querySelector('.nav-home-logo')
      if (!object) return

      function show() {
        setTimeout(() => {
          var logo = object.contentDocument.getElementsByTagName('path')[0]
          logo.setAttribute('fill', '#131313')
        }, 50)
      }
      if (object.contentDocument) show()
      object.addEventListener('load', show, false)
    })()

    // gifs player on logos page
    ;
    (() => {
      let video
      document.addEventListener('mouseover', function (e) {
        if (e.target && e.target.classList.contains('js-play')) {
          video = document.createElement('video')
          video.src = e.target.dataset.video
          video.autoplay = true
          video.loop = true
          video.classList.add('msnry-logo-video')
          e.target.parentNode.append(video)
        }
      })
      document.addEventListener('mouseout', function (e) {
        if (e.target && e.target.classList.contains('js-play')) {
          video.remove()
        }
      })
    })()

    ;
    (() => {
      const btn = document.querySelector('.js-play-home-video')
      const video = document.querySelector('.js-home-video')
      if (video) {
        btn.addEventListener('mouseover', function (e) {
          video.currentTime = 0
          video.play()
        })
        btn.addEventListener('mouseout', function (e) {
          video.pause()
        })
      }
    })()

    // Home mobile slider
    if (document.querySelector('.js-swipe')) {
      const video = document.querySelector('.js-home-mob-video')
      const dots = document.querySelectorAll('.js-mob-dot')
      const homeSlider = new Swipejs(document.querySelector('.js-swipe'), {
        draggable: true,
        continuous: false,
        // disableScroll: true,
        // stopPropagation: true,
        // callback: function (index, element) {},
        transitionEnd: function (index, element) {
          dots.forEach(d => d.classList.remove('is-active'))
          dots[index].classList.add('is-active')

          if (index === 3) {
            video.play()
          } else {
            video.pause()
            video.currentTime = 0
          }
        }
      })

      dots.forEach((d, index) =>
        d.addEventListener('click', function (e) {
          homeSlider.slide(index, 300)
        })
      )
    }

    new LazyLoad()
    new LazyLoad(document.querySelectorAll('.load-now')).loadAndDestroy()
  }, 0)
})