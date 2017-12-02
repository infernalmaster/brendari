class LocaleSetter < Amber::Pipe::Base
  HEADER = "Accept-Language"

  def call(context)
    maybe_locale = context.request.path[1, 2]
    if I18n.available_locales.includes?(maybe_locale)
      I18n.locale = maybe_locale
    else
      current_lang = language_from_header(context.request.headers[HEADER], I18n.available_locales)
      I18n.locale = current_lang if current_lang
    end

    call_next(context)
  end

  def language_from_header(headers_string, app_available_languages) : String | Nil
    begin
      headers_string.to_s.gsub(/\s+/, "").split(",").map do |language|
        splited = language.split(";q=")
        locale, quality = splited[0], splited[1]?
        raise ArgumentError.new "Not correctly formatted" unless locale =~ /^[a-z\-0-9]+|\*$/i

        locale = locale.downcase.gsub(/-[a-z0-9]+$/i, &.upcase) # Uppercase territory
        locale = nil if locale == "*"                           # Ignore wildcards

        quality = quality ? quality.to_f : 1.0

        {locale, quality}
      end.sort do |(_, left), (_, right)|
        right <=> left
      end.map(&.first).compact.map do |preferred| # en-US
        preferred = preferred.downcase
        preferred_language = preferred.split("-", 2).first

        app_available_languages.find do |available| # en
          available = available.to_s.downcase
          preferred == available || preferred_language == available.split("-", 2).first
        end
      end.compact.first?
    rescue ArgumentError # Just rescue anything if the browser messed up badly.
      nil
    end
  end
end
