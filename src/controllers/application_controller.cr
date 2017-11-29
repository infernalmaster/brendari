require "jasper_helpers"

class ApplicationController < Amber::Controller::Base
  include JasperHelpers
  include I18nHelpers
  LAYOUT = "application.slang"
end
