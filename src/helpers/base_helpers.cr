module BaseHelpers
  def present?(val : Nil)
    false
  end

  def present?(val : String)
    val != ""
  end
end
