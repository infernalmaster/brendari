require "secure_random"

# The CSRF Handler adds support for Cross Site Request Forgery.
class Amber::Pipe::CSRF
  # CHECK_METHODS = %w(PUT POST PATCH DELETE)
  # HEADER_KEY    = "X-CSRF-TOKEN"
  # PARAM_KEY     = "_csrf"
  # CSRF_KEY      = "csrf.token"

  def initialize(@refresh_token : Bool = true)
  end

  def call(context : HTTP::Server::Context)
    if valid_http_method?(context) || valid_token?(context)
      context.session.delete(CSRF_KEY) if @refresh_token
      call_next(context)
    else
      raise Amber::Exceptions::Forbidden.new("CSRF check failed.")
    end
  end

  def valid_http_method?(context)
    !CHECK_METHODS.includes?(context.request.method)
  end

  def valid_token?(context)
    token = fetch_token_from_request(context)

    token && Crypto::Subtle.constant_time_compare(token, self.class.token(context))
  end

  def fetch_token_from_request(context)
    context.params[PARAM_KEY]? || context.request.headers[HEADER_KEY]?
  end

  def self.token(context) : String
    (context.session[CSRF_KEY] ||= SecureRandom.urlsafe_base64(32)).to_s
  end

  def self.tag(context)
    %Q(<input type="hidden" name="#{PARAM_KEY}" value="#{token(context)}" />)
  end

  def self.metatag(context)
    %Q(<meta name="#{PARAM_KEY}" content="#{token(context)}" />)
  end
end
