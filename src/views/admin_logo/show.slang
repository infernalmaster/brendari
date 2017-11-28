h1 Show Logo
p = logo.image_url
p = logo.size
p
  == link_to("back", "/admin/logos", class: "btn btn-success btn-xs")
  == link_to("edit", "/admin/logos/#{logo.id}/edit", class: "btn btn-success btn-xs")
  == link_to("delete", "/admin/logos/#{logo.id}?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
