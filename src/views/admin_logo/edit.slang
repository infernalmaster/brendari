h1 Edit Logo

== render(partial: "_form.slang")

== delete_button_to("delete", "/admin/logos/#{logo.id}", class: "btn btn-danger btn-xs", onclick: "return confirm('Are you sure?');")
