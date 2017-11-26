require "./spec_helper"

def project_hash
  {"image_url" => "Fake", "size" => "Fake"}
end

def project_params
  params = [] of String
  params << "image_url=#{project_hash["image_url"]}"
  params << "size=#{project_hash["size"]}"
  params.join("&")
end

def create_project
  model = Project.new(project_hash)
  model.save
  model
end

class ProjectControllerTest < GarnetSpec::Controller::Test
  getter handler : Amber::Pipe::Pipeline

  def initialize
    @handler = Amber::Pipe::Pipeline.new
    @handler.build :web do
      plug Amber::Pipe::Error.new
      plug Amber::Pipe::Logger.new
      plug Amber::Pipe::Session.new
      plug Amber::Pipe::Flash.new
    end
    @handler.prepare_pipelines
  end
end

describe ProjectControllerTest do
  subject = ProjectControllerTest.new

  it "renders project index template" do
    Project.clear
    response = subject.get "/projects"

    response.status_code.should eq(200)
    response.body.should contain("Projects")
  end

  it "renders project show template" do
    Project.clear
    model = create_project
    location = "/projects/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("Show Project")
  end

  it "renders project new template" do
    Project.clear
    location = "/projects/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("New Project")
  end

  it "renders project edit template" do
    Project.clear
    model = create_project
    location = "/projects/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("Edit Project")
  end

  it "creates a project" do
    Project.clear
    response = subject.post "/projects", body: project_params

    response.headers["Location"].should eq "/projects"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end

  it "updates a project" do
    Project.clear
    model = create_project
    response = subject.patch "/projects/#{model.id}", body: project_params

    response.headers["Location"].should eq "/projects"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end

  it "deletes a project" do
    Project.clear
    model = create_project
    response = subject.delete "/projects/#{model.id}"

    response.headers["Location"].should eq "/projects"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end
end
