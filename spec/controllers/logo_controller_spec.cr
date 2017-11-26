require "./spec_helper"

def logo_hash
  {"image_url" => "Fake", "size" => "Fake"}
end

def logo_params
  params = [] of String
  params << "image_url=#{logo_hash["image_url"]}"
  params << "size=#{logo_hash["size"]}"
  params.join("&")
end

def create_logo
  model = Logo.new(logo_hash)
  model.save
  model
end

class LogoControllerTest < GarnetSpec::Controller::Test
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

describe LogoControllerTest do
  subject = LogoControllerTest.new

  it "renders logo index template" do
    Logo.clear
    response = subject.get "/logos"

    response.status_code.should eq(200)
    response.body.should contain("Logos")
  end

  it "renders logo show template" do
    Logo.clear
    model = create_logo
    location = "/logos/#{model.id}"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("Show Logo")
  end

  it "renders logo new template" do
    Logo.clear
    location = "/logos/new"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("New Logo")
  end

  it "renders logo edit template" do
    Logo.clear
    model = create_logo
    location = "/logos/#{model.id}/edit"

    response = subject.get location

    response.status_code.should eq(200)
    response.body.should contain("Edit Logo")
  end

  it "creates a logo" do
    Logo.clear
    response = subject.post "/logos", body: logo_params

    response.headers["Location"].should eq "/logos"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end

  it "updates a logo" do
    Logo.clear
    model = create_logo
    response = subject.patch "/logos/#{model.id}", body: logo_params

    response.headers["Location"].should eq "/logos"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end

  it "deletes a logo" do
    Logo.clear
    model = create_logo
    response = subject.delete "/logos/#{model.id}"

    response.headers["Location"].should eq "/logos"
    response.status_code.should eq(302)
    response.body.should eq "302"
  end
end
