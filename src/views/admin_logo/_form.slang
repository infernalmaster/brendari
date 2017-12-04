- if logo.errors
  ul.errors
  - logo.errors.each do |error|
    li = error.to_s

== form(action: "/admin/logos/#{logo.id.to_s}", method: logo.id ? :patch : :post) do
  == csrf_tag
  div.form-group
    == label(name: "image_url")
    == image_upload(name: "image_url", value: logo.image_url)
  div.form-group
    == label(name: "size")
    == select_field(name: "size", selected: logo.size, collection: [["1x1", "1x1"], ["2x2", "2x2"]], class: "form-control")
  == submit("Submit", class: "btn btn-primary btn-xs")
  == link_to("back", "/admin/logos", class: "btn btn-default btn-xs")
