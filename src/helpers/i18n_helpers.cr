module I18nHelpers
  def t(key : String, force_locale = I18n.locale.to_s, throw = :throw, count = nil, default = nil, iter = nil) : String
    I18n.translate(key, force_locale, throw, count, default, iter)
  end

  def l(object, force_locale = I18n.locale.to_s, format = nil, scope = :number) : String
    I18n.localize(object, force_locale, format, scope)
  end

  def lpath(path)
    "/#{I18n.locale}#{path}"
  end
end
