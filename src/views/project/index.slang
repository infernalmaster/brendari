/ div.row
/   div.col-sm-11
/     h2 Projects
/   div.col-sm-1
/     a.btn.btn-success.btn-xs href="/projects/new" New
/ div.table-responsive
/   table.table.table-striped
/     thead
/       tr
/         th Image_url
/         th Size
/         th Actions
/     tbody
/     - projects.each do |project|
/       tr
/         td = project.image_url
/         td = project.size
/         td
/           span
/             == link_to("read", "/projects/#{project.id}", class: "btn btn-success btn-xs")
/             == link_to("edit", "/projects/#{project.id}/edit", class: "btn btn-success btn-xs")
/             == link_to("delete", "/projects/#{ project.id }?_method=delete&_csrf=#{csrf_token}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")

== render(partial: "layouts/_nav.ecr")


.msnry-wrap.msnry-projects
  .msnry.js-msnry
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item.msnry-item-2x2
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item.msnry-item-2x1
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item.msnry-item-1x2
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
    .msnry-item
      .msnry-aspect
        .msnry-aspect-inner
          .msnry-item-bg
          .msnry-item-title Michael Jordan
          .msnry-item-dscr Logo design for interior designer
script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.5.1/muuri.min.js"
