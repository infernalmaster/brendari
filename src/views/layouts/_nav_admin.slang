- active = context.request.path == "/" ? "active" : ""
a class="nav-item #{active}" href="/" Home
- if context.current_user
  a class="nav-item pull-right" href="/signout" Sign Out
  div.nav-item.pull-right == context.current_user.not_nil!.email
- else
  - active = context.request.path == "/signup" ? "active" : ""
  a class="nav-item #{active} pull-right" href="/signup" Sign Up
  - active = context.request.path == "/signin" ? "active" : ""
  a class="nav-item #{active} pull-right" href="/signin" Sign In
- active = context.request.path == "/logos" ? "active" : ""
a class="nav-item #{active}" href="/logos" Logos
- active = context.request.path == "/projects" ? "active" : ""
a class="nav-item #{active}" href="/projects" Projects
