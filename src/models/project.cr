require "granite_orm/adapter/pg"

class Project < Granite::ORM::Base
  adapter pg
  table_name projects


  # id : Int64 primary key is created for you
  field image_url : String
  field size : String
  timestamps
end
