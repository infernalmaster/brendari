class LogoController < ApplicationController
  def index
    logos = Logo.all
    render("index.slang")
  end

  def show
    if logo = Logo.find params["id"]
      render("show.slang")
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/logos"
    end
  end

  def new
    logo = Logo.new
    render("new.slang")
  end

  def create
    logo = Logo.new(logo_params.validate!)

    if logo.valid? && logo.save
      flash["success"] = "Created Logo successfully."
      redirect_to "/logos"
    else
      flash["danger"] = "Could not create Logo!"
      render("new.slang")
    end
  end

  def edit
    if logo = Logo.find params["id"]
      render("edit.slang")
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/logos"
    end
  end

  def update
    if logo = Logo.find(params["id"])
      logo.set_attributes(logo_params.validate!)
      if logo.valid? && logo.save
        flash["success"] = "Updated Logo successfully."
        redirect_to "/logos"
      else
        flash["danger"] = "Could not update Logo!"
        render("edit.slang")
      end
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/logos"
    end
  end

  def destroy
    if logo = Logo.find params["id"]
      logo.destroy
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
    end
    redirect_to "/logos"
  end

  def logo_params
    params.validation do
      required(:image_url) { |f| !f.nil? }
      required(:size) { |f| !f.nil? }
    end
  end
end
