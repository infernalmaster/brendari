== render(partial: "layouts/_nav.ecr")

.p-contacts

  .c-gmap-wrap
    .c-gmap.js-gmap

  .c-text-block
    .c-address
      | 11, Trynitarska
      br
      | Ivano-Frankivsk, Ukraine, 76000

    .c-email
      | hello@brendari.com

    .c-phone
      span +38
      | 067 998-87-27

    ul.socials.c-socials
      == render(partial: "layouts/_socials.ecr")

    ul.footer-links
      li
        a.footer-link.doc href="#" Brief

      li
        a.footer-link.pdf href="#" Presentation
          span.accent PDF
