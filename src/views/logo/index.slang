== render(partial: "layouts/_nav.ecr")

.msnry-wrap.msnry-logos
  .msnry.js-msnry
    - logos.each do |logo|
      div class="msnry-item msnry-item-#{logo.size}"
        .msnry-aspect
          .msnry-aspect-inner
            / .msnry-gif-icon.js-play GIF
            .msnry-open-icon
            img.msnry-logo.lazyload data-src="#{uploaded_path(logo.image_gray)}"
            .msnry-logo-color.lazyload data-src="#{uploaded_path(logo.image_colorfull)}"
            noscript
              img.msnry-logo src="#{uploaded_path(logo.image_gray)}"

            / video.msnry-logo-video.js-player loop="loop"
            /   / source src="somevideo.webm" type="video/webm">
            /   source src="/images/gonir.mp4" type="video/mp4"

== render(partial: "layouts/_footer.slang")
