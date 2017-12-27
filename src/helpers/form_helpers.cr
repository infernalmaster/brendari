require "jasper_helpers"

module FormHelpers
  include JasperHelpers

  def image_upload(name : String | Symbol, **options : Object)
    content(:div, {:class => "js-wrap"}) do
      String.build do |str|
        str << input_field(type: :file, class: "js-fileupload", "data-path": "/admin/upload")
        str << "<div class='progress'><div class='js-pbar progress-bar'></div></div>"
        str << input_field(type: :hidden, name: name, id: name, class: "js-file-text", value: options[:value]?)
        str << "<img class='js-img img-responsive' src='#{uploaded_path(options[:value])}' />"
      end
    end
  end

  def uploaded_path(name : String | Nil) : String
    "/uploads/#{name}"
  end

  def delete_button_to(body : String, url : String, **options : Object)
    button_to(body, url, :delete, **options) do
      csrf_tag
    end
  end

  # BEGIN delete this after new release of jasper_helpers
  def button_to(body : String, url : String, method : Symbol = :post)
    form(action: url, method: method) do
      content(:button, body, {:type => "submit"})
    end
  end

  def button_to(body : String, url : String, method : Symbol = :post)
    form(action: url, method: method) do
      String.build do |str|
        str << yield
        str << content(:button, body, {:type => "submit"})
      end
    end
  end

  def button_to(body : String, url : String, method : Symbol = :post, **options : Object)
    form(action: url, method: method) do
      String.build do |str|
        str << yield
        str << content(:button, body, options.to_h)
      end
    end
  end
  # END delete this after new release of jasper_helpers
end
