/ div.row
/   div.col-sm-11
/     h2 Logos
/   div.col-sm-1
/     a.btn.btn-success.btn-xs href="/logos/new" New
/ div.table-responsive
/   table.table.table-striped
/     thead
/       tr
/         th Image_url
/         th Size
/         th Actions
/     tbody
/     - logos.each do |logo|
/       tr
/         td = logo.image_url
/         td = logo.size
/         td
/           span
/             == link_to("read", "/logos/#{logo.id}", class: "btn btn-success btn-xs")
/             == link_to("edit", "/logos/#{logo.id}/edit", class: "btn btn-success btn-xs")
/             == link_to("delete", "/logos/#{ logo.id }?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")

== render(partial: "layouts/_nav.ecr")

.msnry-wrap.msnry-logos
  .msnry.js-msnry
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-gif-icon.js-play GIF
          .msnry-open-icon
          img.msnry-logo src="/images/gonir.jpg" /
          img.msnry-logo-color src="/images/gonir-color.png" /

          video.msnry-logo-video.js-player loop="loop"
            / source src="somevideo.webm" type="video/webm">
            source src="/images/gonir.mp4" type="video/mp4"
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/comunity.jpg" /
    .msnry-item.msnry-item-2x2
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/comunity.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/comunity.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-gif-icon GIF
          .msnry-open-icon
          img.msnry-logo src="/images/comunity.jpg" /
    .msnry-item.msnry-item-2x1
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
    .msnry-item.msnry-item-1x2
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          img.msnry-logo src="/images/gonir.jpg" /
script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.5.1/muuri.min.js"
