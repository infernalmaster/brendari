div.row
  div.col-sm-11
    h2 Logos
  div.col-sm-1
    a.btn.btn-success.btn-xs href="/admin/logos/new" New

meta name="_csrf" content="#{csrf_token}"
div.row
  .msnry-wrap.msnry-logos
    .msnry.js-msnry
      - logos.each do |logo|
        div class="msnry-item msnry-item-#{logo.size}" data-id="#{logo.id}"
          .msnry-aspect
            .msnry-aspect-inner
              img.msnry-logo src="#{uploaded_path(logo.image_gray)}"

              span style="position: absolute;"
                == link_to("edit", "/admin/logos/#{logo.id}/edit", class: "btn btn-success btn-xs")
