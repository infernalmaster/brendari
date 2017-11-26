- if logo.errors
  ul.errors
  - logo.errors.each do |error|
    li = error.to_s

== form(action: "/logos/#{logo.id.to_s}", method: logo.id ? :patch : :post) do
  == csrf_tag
  div.form-group
  == text_area(name: "image_url", content: logo.image_url, placeholder: "Image_url", class: "form-control", size: "30x10")
  div.form-group
  == text_area(name: "size", content: logo.size, placeholder: "Size", class: "form-control", size: "30x10")
  == submit("Submit", class: "btn btn-primary btn-xs")
  == link_to("back", "/logos", class: "btn btn-default btn-xs")
