doctype html
html lang="#{iso_locale}"
  head
    title Blog using Amber
    meta charset="utf-8"
    meta http-equiv="X-UA-Compatible" content="IE=edge"
    meta name="viewport" content="width=device-width, initial-scale=1"

    style type="text/css"
      == asset_inline("main.bundle.css")

  body
    == content

    noscript
      style .msnry-item { width: 25%; float: left; }

    script src="#{assets_url("main.bundle.js")}"
