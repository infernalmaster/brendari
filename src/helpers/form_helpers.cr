require "jasper_helpers"

module FormHelpers
  include JasperHelpers

  def image_upload(name : String | Symbol, **options : Object)
    String.build do |str|
      str << "<div class='js-wrap'>"
      str << input_field(type: :file, options: Kit.safe_hash({class: "js-fileupload", "data-path": "/admin/upload"}))
      str << "<div class='progress'><div class='js-pbar progress-bar'></div></div>"
      str << input_field(type: :hidden, options: Kit.safe_hash({name: name, id: name, class: "js-file-text", value: options[:value]?}))
      str << "<img class='js-img img-responsive' src='#{uploaded_path(options[:value])}' />"
      str << "</div>"
    end
  end

  def uploaded_path(name : String | Nil)
    "/uploads/#{name}"
  end
end
