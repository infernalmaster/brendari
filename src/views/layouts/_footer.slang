footer.main-footer

  ul.footer-links
    li
      a.footer-link.doc href="#"= t("general.brief")

    li
      a.footer-link.pdf href="#"= t("general.presentation")
        span.accent PDF

  .f-contacs
    p.fc-email hello@brendari.com
    p.fc-phone +38 067 998-87-27

  .cf.lh-20
    ul.c1-3.scls.f-socials
      == render(partial: "layouts/_socials.ecr")
    .c1-3.f-authors by Syvak & Diachok
    .c1-3.f-cprght= "© 2015 – #{Time.now.year} Brendari. #{t("general.rights")}"
