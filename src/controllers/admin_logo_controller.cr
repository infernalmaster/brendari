class AdminLogoController < ApplicationController
  LAYOUT = "admin.slang"

  def index
    logos = Logo.all("ORDER BY position ASC")
    render("index.slang")
  end

  def show
    if logo = Logo.find params["id"]
      render("show.slang")
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/admin/logos"
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
      redirect_to "/admin/logos"
      render("new.slang")
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
      redirect_to "/admin/logos"
    end
  end

  def reposition
    params["ids"].split(",").map_with_index do |id, index|
      if logo = Logo.find id.to_s
        logo.position = index
        logo.save
      end
    end

    set_response({status: "success", csrf_token: csrf_token}.to_json, 200, Content::TYPE[:json])
  end

  def update
    if logo = Logo.find(params["id"])
      logo.set_attributes(logo_params.validate!)
      if logo.valid? && logo.save
        flash["success"] = "Updated Logo successfully."
        redirect_to "/admin/logos"
      else
        flash["danger"] = "Could not update Logo!"
        render("edit.slang")
      end
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
      redirect_to "/admin/logos"
    end
  end

  def destroy
    if logo = Logo.find params["id"]
      logo.destroy
    else
      flash["warning"] = "Logo with ID #{params["id"]} Not Found"
    end
    redirect_to "/admin/logos"
  end

  def logo_params
    params.validation do
      required(:slug) { |f| !f.nil? }
      required(:image_gray) { |f| !f.nil? }
      required(:image_colorfull) { |f| !f.nil? }
      required(:animation) { |f| !f.nil? }
      required(:title_en) { |f| !f.nil? }
      required(:title_uk) { |f| !f.nil? }
      required(:size) { |f| !f.nil? }
    end
  end
end
