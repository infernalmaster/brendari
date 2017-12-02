require "granite_orm/adapter/pg"

class Logo < Granite::ORM::Base
  adapter pg
  table_name logos

  # id : Int64 primary key is created for you
  field image_url : String
  field size : String
  timestamps
end
