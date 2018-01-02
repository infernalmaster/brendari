== render(partial: "layouts/_nav.ecr")

.msnry-wrap.msnry-logos
  .msnry.js-msnry
    - logos.each do |logo|
      div class="msnry-item msnry-item-#{logo.size}"
        .msnry-aspect
          .msnry-aspect-inner
            - if present?(logo.animation)
              .msnry-gif-icon.js-play data-video="#{uploaded_path(logo.animation)}" GIF

            .msnry-open-icon
            img.msnry-logo.lazyload data-src="#{uploaded_path(logo.image_gray)}"
            .msnry-logo-color.lazyload data-src="#{uploaded_path(logo.image_colorfull)}"
            noscript
              img.msnry-logo src="#{uploaded_path(logo.image_gray)}"

== render(partial: "layouts/_footer.slang")
