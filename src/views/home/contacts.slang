== render(partial: "layouts/_nav.ecr")

.p-contacts
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

    ul.socials
      li
        a.l-be href="#"
      li
        a.l-dr href="#"
      li
        a.l-in href="#"
      li
        a.l-f href="#"


    ul.footer-links
      li
        a href="#"
          svg width="9" height="12" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"
            path d="M1 0h5.054v2.086c0 .552.447 1 1 1H9V11c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1c0-.552.448-1 1-1z" fill="#F00" fill-rule="evenodd"

      li
        a href="#"
          svg width="12" height="14" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg"
            g fill="none" fill-rule="evenodd"
              path d="M.87 4.154c-.6 0-.9.72-.485 1.148l5.2 5.355c.266.272.706.272.97 0L11.76 5.3c.415-.43.115-1.148-.485-1.148H8.337L8.34.267 3.8.27v3.884H.87z" fill="#F00" fill-rule="nonzero"
              path d="M1.5 13.5h9" stroke="#F00" stroke-linecap="square"


  .c-gmap-wrap
    .c-gmap.js-gmap


script src="http://maps.google.com/maps/api/js"