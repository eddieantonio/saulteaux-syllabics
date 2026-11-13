Syllabics.app
=============

![End-to-end tests](https://github.com/eddieantonio/syllabics.app/workflows/End-to-end%20tests/badge.svg?branch=production)
[![Cypress Recordings](https://img.shields.io/badge/cypress-recordings-1dbe89.svg)](https://dashboard.cypress.io/#/projects/addnr3/runs)

Source code for the [saulteaux.syllabics.app][]. This is a fork of [syllabics.app][].


Develop
-------

To develop, download dependencies with `npm` (or `yarn`):

    npm install

This app builds using [Parcel]. To build, use the following:

    npm run build

This bundles the site to `dist/`.

When I'm developing, I use Parcel in serve mode:

    npm start

This starts a development server at <http://localhost:1234/> that
automatically reloads when files change.

Test
----

This project has two kinds of tests:

 - Unit tests, using [AVA][]
 - End-to-end (E2E) tests using [Cypress][]

Run unit tests:

    npm test

Run E2E tests, make sure the server is running, then

    npm run test:e2e

Note: this runs in Google Chrome by default.

To edit E2E tests interactively, use `cypress open`:

    npx cypress open

[Cypress]: https://www.cypress.io/
[AVA]: https://github.com/avajs/ava


Deploy
------

This app is deployed using [Vercel][]. Now should automatically deploy all
pull requests, as well as the `production` branch. 

[Vercel]: https://vercel.com/
[Parcel]: https://parceljs.org/
[saulteaux.syllabics.app]: https://saulteaux.syllabics.app/
[syllabics.app]: https://syllabics.app/


License
-------

Copyright © 2020 National Research Council Canada.<br/>
Copyright © 2026 Eddie Antonio Santos.

Licensed under the MIT license.
