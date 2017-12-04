- if logo.errors
  ul.errors
  - logo.errors.each do |error|
    li = error.to_s

== form(action: "/admin/logos/#{logo.id.to_s}", method: logo.id ? :patch : :post) do
  == csrf_tag
  div.form-group
    == label(name: "image_gray")
    == image_upload(name: "image_gray", value: logo.image_gray)
  div.form-group
    == label(name: "image_colorfull")
    == image_upload(name: "image_colorfull", value: logo.image_colorfull)
  div.form-group
    == label(name: "animation")
    == image_upload(name: "animation", value: logo.animation)
  div.form-group
    == label(name: "title_en")
    == text_area(name: "title_en", content: logo.title_en, placeholder: "Title", class: "form-control", size: "30x10")
  div.form-group
    == label(name: "title_uk")
    == text_area(name: "title_uk", content: logo.title_uk, placeholder: "Title", class: "form-control", size: "30x10")
  div.form-group
    == label(name: "size")
    == select_field(name: "size", selected: logo.size, collection: [["1x1", "1x1"], ["2x2", "2x2"]], class: "form-control")
  == submit("Submit", class: "btn btn-primary btn-xs")
  == link_to("back", "/admin/logos", class: "btn btn-default btn-xs")
