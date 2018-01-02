- if project.errors
  ul.errors
  - project.errors.each do |error|
    li = error.to_s

== form(action: "/admin/projects/#{project.id.to_s}", method: project.id ? :patch : :post) do
  == csrf_tag
  div.form-group
    == label(name: "slug")
    == text_field(name: "slug", value: project.slug, placeholder: "Title", class: "form-control")
  div.form-group
    == text_area(name: "image_url", content: project.image_url, placeholder: "Image_url", class: "form-control", size: "30x10")
  div.form-group
    == text_area(name: "size", content: project.size, placeholder: "Size", class: "form-control", size: "30x10")
  == submit("Submit", class: "btn btn-primary btn-xs")
  == link_to("back", "/admin/projects", class: "btn btn-default btn-xs")
