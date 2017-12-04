h1 Show Logo
p = logo.size
p
  == link_to("back", "/logos", class: "btn btn-success btn-xs")
  == link_to("edit", "/logos/#{logo.id}/edit", class: "btn btn-success btn-xs")
  == link_to("delete", "/logos/#{logo.id}?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
