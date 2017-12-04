require "granite_orm/adapter/pg"

class Logo < Granite::ORM::Base
  adapter pg
  table_name logos

  # id : Int64 primary key is created for you
  field image_gray : String
  field image_colorfull : String
  field animation : String
  field title_en : String
  field title_uk : String
  field size : String
  timestamps

  def title
    case I18n.locale
    when "en" then title_en
    when "uk" then title_uk
    end
  end
end
