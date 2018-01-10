class UploadController < ApplicationController
  def index
    if context.params.files.has_key?("file") && !context.params.files["file"].filename.nil?
      fname = context.params.files["file"].filename.to_s
      extension = File.extname(fname)
      base = File.basename(fname, extension)
      new_file_name = "#{base}__#{Time.utc_now.epoch_ms}#{extension}"
      new_full_name = "/uploads/#{new_file_name}"

      ::File.open("./public#{new_full_name}", "w") do |f|
        ::IO.copy(context.params.files["file"].file, f)
      end
      context.params.files["file"].file.unlink

      set_response({file: new_file_name, full_name: new_full_name, csrf_token: csrf_token}.to_json, 201, Content::TYPE[:json])
    else
      set_response("form field \"file\" needed", 407, Content::TYPE[:text])
    end
  end
end
