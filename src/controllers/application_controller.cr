require "jasper_helpers"

class ApplicationController < Amber::Controller::Base
  include JasperHelpers
  include I18nHelpers
  include FormHelpers
  include AssetsHelpers

  LAYOUT = "application.slang"
end
