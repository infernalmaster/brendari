div.row
  div.col-sm-11
    h2 Projects
  div.col-sm-1
    a.btn.btn-success.btn-xs href="/admin/projects/new" New
div.table-responsive
  table.table.table-striped
    thead
      tr
        th Image_url
        th Size
        th Actions
    tbody
    - projects.each do |project|
      tr
        td = project.image_url
        td = project.size
        td
          span
            == link_to("read", "/admin/projects/#{project.id}", class: "btn btn-success btn-xs")
            == link_to("edit", "/admin/projects/#{project.id}/edit", class: "btn btn-success btn-xs")
            == link_to("delete", "/admin/projects/#{ project.id }?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
