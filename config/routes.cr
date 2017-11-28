Amber::Server.configure do |app|
  pipeline :web, :admin do
    # Plug is the method to use connect a pipe (middleware)
    # A plug accepts an instance of HTTP::Handler
    plug Amber::Pipe::Error.new
    plug Amber::Pipe::Logger.new
    plug Amber::Pipe::Session.new
    plug Amber::Pipe::Flash.new
    plug Amber::Pipe::CSRF.new
    # plug HTTP::CompressHandler.new
  end

  pipeline :admin do
    plug Authenticate.new
  end

  # All static content will run these transformations
  pipeline :static do
    plug Amber::Pipe::Error.new
    plug Amber::Pipe::Static.new "./public"
    plug HTTP::CompressHandler.new
  end

  routes :static do
    # Each route is defined as follow
    # verb resource : String, controller : Symbol, action : Symbol
    get "/*", Amber::Controller::Static, :index
  end

  routes :web do
    resources "/projects", ProjectController, only: [:index, :show]
    resources "/logos", LogoController, only: [:index, :show]

    get "/signin", SessionController, :new
    post "/session", SessionController, :create
    get "/signout", SessionController, :delete
    get "/signup", RegistrationController, :new
    post "/registration", RegistrationController, :create

    get "/", HomeController, :index
    get "/contacts", HomeController, :contacts
    get "/about", HomeController, :about
  end

  routes :admin, "/admin" do
    resources "/projects", AdminProjectController
    resources "/logos", AdminLogoController
  end
end
