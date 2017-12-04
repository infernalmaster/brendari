require "jasper_helpers"

module FormHelpers
  include JasperHelpers

  def image_upload(name : String | Symbol, **options : Object)
    options_hash = Kit.safe_hash({name: name, id: name, class: "js-file-text"}, options)
    String.build do |str|
      str << "<div class='js-wrap'>"
      str << input_field(type: :file, options: Kit.safe_hash({class: "js-fileupload"}))
      str << "<div class='progress'><div class='js-pbar progress-bar'></div></div>"
      str << input_field(type: :text, options: options_hash)
      str << "<img class='js-img img-responsive' src='#{uploaded_path(options[:value])}' />"
      str << "</div>"
    end
  end

  def uploaded_path(name : String | Nil)
    "/uploads/#{name}"
  end
end
