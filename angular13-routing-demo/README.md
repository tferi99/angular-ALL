# Angular13RoutingDemo

This project demonstrates how to pass query parameters in Angular 13 and how
this parameter can be preserved via routing.

You can pass a color value in URL query parameter. 
This color value is then used as background color for components.
All query parameters are preserved during redirection.

Application uses HashLocationStrategy, so the URL looks like this:

[http://localhost:4200/#/home?color=yellow](http://localhost:4200/#/home?color=yellow)

OR 

[http://localhost:4200/#?color=yellow](http://localhost:4200/#?color=yellow)

We demonstrate how to solve parameter transmission in use-cases, like:
- router redirection
- redirection from guards
- redirection from other use-cases, like logout


