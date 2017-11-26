class HomeController < ApplicationController
  def index
    render("index.slang")
  end

  def contacts
    render("contacts.slang")
  end

  def about
    render("about.slang")
  end
end
