class CacheHeader < Amber::Pipe::Base
  ONE_YEAR_IN_SECONDS = 31536000
  def call(context : HTTP::Server::Context)
    context.response.headers["Cache-Control"] = "max-age=#{ONE_YEAR_IN_SECONDS}"

    call_next(context)
  end
end
