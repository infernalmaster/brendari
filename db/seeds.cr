require "amber"
require "../src/models/*"

user = User.new
user.email = "admin@example.com"
user.password = "password"
user.save

rnd = Random.new

200.times do |i|
  logo = Logo.new(
    slug: "slug #{i}",
    image_gray: "gonir.jpg",
    image_colorfull: "gonir-color.png",
    animation: "",
    title_en: "",
    title_uk: "",
    size: (rnd.rand < 0.8 ? "1x1" : "2x2")
  )
  logo.save
end
