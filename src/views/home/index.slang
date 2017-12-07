.home-desktop

  object.big-logo type="image/svg+xml" data="/svg/logo.svg" Brendari
  section.big-plate
    .overflow-hdn
      p.bp-studio-short== t("home.slogan")
      .bp-link-wrap
        a.bp-link href="#{lpath("/about")}"
          | About studio
        svg class="bp-shape" width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
          circle cx="45" cy="6" r="4.5" transform="translate(-40 -1)" stroke="#F00" fill="#F00" fill-rule="evenodd"
        span.bp-red-line
      .bp-hover-wrap.bg-2men
        / img.bphw-img src="/images/__About%20studio%20+%20Oval%20Mask.jpg" /
  .plate-divider
    .plate-divide-cross
  section.big-plate
    .overflow-hdn
      .bp-link-wrap
        a.bp-link href="#{lpath("/projects")}"
          | We created
        svg class="bp-shape" width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"
          path d="M.5.5h8v8h-8z" stroke="#F00" fill="#F00" fill-rule="evenodd"
        span.bp-red-line
      .bp-hover-wrap.bg-wc
  .plate-divider.plate-divider-2
    .plate-divide-cross
  section.big-plate
    .overflow-hdn
      .bp-link-wrap
        a.bp-link href="#{lpath("/projects")}"
          | Logos
        svg class="bp-shape" width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg"
          path d="M5.5.63L.58 4.386 2.47 10.5h6.06l1.89-6.113L5.5.63z" stroke="#F00" fill="#F00" fill-rule="evenodd"
        span.bp-red-line
  .plate-divider.plate-divider-3
    .plate-divide-cross
  section.big-plate
    .overflow-hdn
      .bp-link-wrap
        a.bp-link href="#{lpath("/projects")}"
          | Contacts
        svg class="bp-shape" width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg"
          path d="M6 9.028L.883.5h10.234L6 9.028z" stroke="#F00" fill="#F00" fill-rule="evenodd"
        span.bp-red-line
      .bp-hover-wrap
        .gmap.js-gmap

.home-mobile.swipe.js-swipe
  .swipe-wrap
    section.mob-section
      .mobs
        object type="image/svg+xml" data="/svg/logo.svg" Brendari
        p.mobs-studio-short== t("home.slogan")

      .mob-dots
        svg.dot height="11" viewbox="0 0 10 11" width="10" xmlns="http://www.w3.org/2000/svg"
          path d="M4.98.648L.5 4.35v6.15h4.098V6.563h2.898V10.5H9.5V4.35L4.98.65z" fill="#F00" fill-rule="evenodd" stroke="#F00" /
        svg.dot height="10" viewbox="0 0 10 10" width="10" xmlns="http://www.w3.org/2000/svg"
          circle cx="45" cy="6" fill="#F00" fill-rule="evenodd" r="4.5" stroke="#F00" transform="translate(-40 -1)"
        svg.dot height="9" viewbox="0 0 9 9" idth="9" xmlns="http://www.w3.org/2000/svg"
          path d="M.5.5h8v8h-8z" fill="#F00" fill-rule="evenodd" stroke="#F00" /
        svg.dot height="11" viewbox="0 0 11 11" width="11" xmlns="http://www.w3.org/2000/svg"
          path d="M5.5.63L.58 4.386 2.47 10.5h6.06l1.89-6.113L5.5.63z" fill="#F00" fill-rule="evenodd" stroke="#F00" /
        svg.dot height="10" viewbox="0 0 12 10" width="12" xmlns="http://www.w3.org/2000/svg"
          path d="M6 9.028L.883.5h10.234L6 9.028z" fill="#F00" fill-rule="evenodd" stroke="#F00" /
    section.mob-section.bg-2men
      h2.mob-title About studio
      a.btn-explore href="#{lpath("/about")}" explore
    section.mob-section.bg-wc
      h2.mob-title We created
      a.btn-explore href="#{lpath("/projects")}" explore
    section.mob-section
      h2.mob-title Logos
      a.btn-explore href="#{lpath("/logos")}" explore
    section.mob-section
      h2.mob-title Contacts
      a.btn-explore href="#{lpath("/contacts")}" explore

  == render(partial: "layouts/_nav.ecr")

script src="http://maps.google.com/maps/api/js"
