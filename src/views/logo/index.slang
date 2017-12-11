== render(partial: "layouts/_nav.ecr")

.msnry-wrap.msnry-logos
  .msnry.js-msnry
    - logos.each do |logo|
      div class="msnry-item msnry-item-#{logo.size}"
        .msnry-aspect
          .msnry-aspect-inner
            / .msnry-gif-icon.js-play GIF
            .msnry-open-icon
            img.msnry-logo src="#{uploaded_path(logo.image_gray)}"
            img.msnry-logo-color src="#{uploaded_path(logo.image_colorfull)}"

            / video.msnry-logo-video.js-player loop="loop"
            /   / source src="somevideo.webm" type="video/webm">
            /   source src="/images/gonir.mp4" type="video/mp4"

== render(partial: "layouts/_footer.slang")

script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.5.1/muuri.min.js"
