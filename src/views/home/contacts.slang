== render(partial: "layouts/_nav.ecr")

.p-contacts

  .c-gmap-wrap
    .c-gmap.js-gmap

  .c-text-block.js-contacts-text

    .vcard itemscope="true" itemtype="http://schema.org/NGO"

      .hdn
        img.logo.photo src="/images/logo.png" itemprop="logo"
        a.u-url.url href="http://brendari.com" rel="me" itemprop="url" Brendari
        span.fn.org itemprop="name" Brendari
        .pricerange $500 - $10000
        span.category design

      .c-address.adr itemprop="address" itemscope="true" itemtype="http://schema.org/PostalAddress"
        span.street-address itemprop="streetAddress" 11, Trynitarska
        br
        span itemprop="addressLocality"
          span.locality Ivano-Frankivsk,
          span.country-name Ukraine,
        span.postal-code itemprop="postalCode" 76000

      .c-email.email itemprop="email" hello@brendari.com

      .c-phone.tel itemprop="telephone"
        <span>+38</span> 067 998-87-27

    ul.scls.c-socials
      == render(partial: "layouts/_socials.ecr")

    ul.footer-links
      li
        a.footer-link.doc href="#" Brief

      li
        a.footer-link.pdf href="#" Presentation
          span.accent PDF
