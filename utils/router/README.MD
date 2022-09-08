# Nested Router

Simple nested JS object as a router.

Special cases are:

## $VALUE
Anything with a preceding "$" will be considered a slug, and will default to this slug if no other routes are available at this level.

## /
The forward slash is considered to be a special "this level" identifier, and if the route path is exhausted, the function at this identifier will be run.

# Creating a route
Create a route by nested a few paths or so, and then make a function reference at the "/" value underneath it. This function will receive the request, response, and all preceding slugs.
Once the route matches, the function will fire. It is up to the engineer to determing the route method in the function, as multiple methods can be handled within a single function.
**All matched route function methods must return a non-falsey value. **
Error logging should be done within the route function, as this gives more flexibility for debugging.