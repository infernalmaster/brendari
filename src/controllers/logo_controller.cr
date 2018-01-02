class LogoController < ApplicationController
  def index
    logos = Logo.all("ORDER BY position ASC")
    render("index.slang")
  end

  def show
    if logo = Logo.find_by(:slug, params["id"])
      render("show.slang")
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/logos"
    end
  end
end
