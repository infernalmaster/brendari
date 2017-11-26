require "./spec_helper"
require "../../src/models/project.cr"

describe Project do
  Spec.before_each do
    Project.clear
  end
end
