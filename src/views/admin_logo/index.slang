div.row
  div.col-sm-11
    h2 Logos
  div.col-sm-1
    a.btn.btn-success.btn-xs href="/admin/logos/new" New
div.table-responsive
  table.table.table-striped
    thead
      tr
        th Image_url
        th Size
        th Actions
    tbody
    - logos.each do |logo|
      tr
        td = logo.image_url
        td = logo.size
        td
          span
            == link_to("read", "/admin/logos/#{logo.id}", class: "btn btn-success btn-xs")
            == link_to("edit", "/admin/logos/#{logo.id}/edit", class: "btn btn-success btn-xs")
            == link_to("delete", "/admin/logos/#{ logo.id }?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
