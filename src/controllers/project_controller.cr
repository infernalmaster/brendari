class ProjectController < ApplicationController
  def index
    projects = Project.all
    render("index.slang")
  end

  def show
    if project = Project.find params["id"]
      render("show.slang")
    else
      flash["warning"] = "Project with ID #{params["id"]} Not Found"
      redirect_to "/projects"
    end
  end

  def new
    project = Project.new
    render("new.slang")
  end

  def create
    project = Project.new(project_params.validate!)

    if project.valid? && project.save
      flash["success"] = "Created Project successfully."
      redirect_to "/projects"
    else
      flash["danger"] = "Could not create Project!"
      render("new.slang")
    end
  end

  def edit
    if project = Project.find params["id"]
      render("edit.slang")
    else
      flash["warning"] = "Project with ID #{params["id"]} Not Found"
      redirect_to "/projects"
    end
  end

  def update
    if project = Project.find(params["id"])
      project.set_attributes(project_params.validate!)
      if project.valid? && project.save
        flash["success"] = "Updated Project successfully."
        redirect_to "/projects"
      else
        flash["danger"] = "Could not update Project!"
        render("edit.slang")
      end
    else
      flash["warning"] = "Project with ID #{params["id"]} Not Found"
      redirect_to "/projects"
    end
  end

  def destroy
    if project = Project.find params["id"]
      project.destroy
    else
      flash["warning"] = "Project with ID #{params["id"]} Not Found"
    end
    redirect_to "/projects"
  end

  def project_params
    params.validation do
      required(:image_url) { |f| !f.nil? }
      required(:size) { |f| !f.nil? }
    end
  end
end
