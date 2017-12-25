require "json"

module AssetsConfig
  extend self

  @@file : JSON::Any = JSON.parse("{}")

  def load_file
    @@file = JSON.parse(File.read("./public/assetsHash.json"))
  end

  def file
    @@file
  end
end

AssetsConfig.load_file


module AssetsHelpers
  def assets_url(path : String) : String
    name = begin
      AssetsConfig.file[path][0].to_s
    rescue
      AssetsConfig.file[path].to_s
    end

    "/dist/#{name}"
  end

  def asset_inline(path : String) : String
    File.read("./public#{assets_url(path)}")
  end
end
