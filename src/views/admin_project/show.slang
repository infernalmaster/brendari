h1 Show Project
p = project.image_url
p = project.size
p
  == link_to("back", "/admin/projects", class: "btn btn-success btn-xs")
  == link_to("edit", "/admin/projects/#{project.id}/edit", class: "btn btn-success btn-xs")
  == link_to("delete", "/admin/projects/#{project.id}?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
