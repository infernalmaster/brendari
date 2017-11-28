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
end
