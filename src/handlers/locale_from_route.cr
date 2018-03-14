class LocaleFromRoute < Amber::Pipe::Base
  def call(context)
    maybe_locale = I18nHelpers.translate_locale(context.request.path[1, 2])

    if I18n.available_locales.includes?(maybe_locale)
      I18n.locale = maybe_locale
    end

    call_next(context)
  end
end
