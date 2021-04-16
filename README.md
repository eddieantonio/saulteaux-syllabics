Syllabics.app
=============

![End-to-end tests](https://github.com/eddieantonio/syllabics.app/workflows/End-to-end%20tests/badge.svg?branch=production)
[![Cypress Recordings](https://img.shields.io/badge/cypress-recordings-1dbe89.svg)](https://dashboard.cypress.io/#/projects/addnr3/runs)

Source code for the [syllabics.app][]. This is a Western Cree SRO to
syllabics converter app, powered by [cree-sro-syllabics][].


Develop
-------

To develop, download dependencies with `npm` (or `yarn`):

    npm install

This app builds using [Parcel]. To build, use the following:

    npx parcel build index.html

This bundles the site to `dist/`.

When I'm developing, I use Parcel in serve mode:

    npx parcel serve index.html

This starts a development server at <http://localhost:1234/> that
automatically reloads when files change.

Test
----

This project uses browser tests written in [Cypress][].

To install test dependencies, run:

    npm run install:test

This installs Cypress (very large dependency), and does **NOT** add it
to `package-lock.json`.

> **NOTE**: Cypress must NEVER be included in `package-lock.json`,
> because its file size exceeds the limits of Now's free plan (100MiB per file
> limit). Now will install everything in `package-lock.json`, which
> includes Cypress. Cypress is never used, and it **breaks the Now
> build**. As such, it must be installed separately, skipping
> `package-lock.json`.

To interactively run tests, open Cypress:

    cypress open

Add tests to `cypress/integration/`. See Cypress's docs for more help.


[Cypress]: https://www.cypress.io/


Deploy
------

This app is deployed using [Now][]. Now should automatically deploy all
pull requests, as well as the `production` branch. To run the build
script run by Now, type the following:

    npm run now-build

This will create a static site in `dist/`.

[cree-sro-syllabics]: https://github.com/eddieantonio/cree-sro-syllabics.js
[Now]: https://zeit.co/now
[Parcel]: https://parceljs.org/
[syllabics.app]: https://syllabics.app/


License
-------

Copyright © 2020 National Research Council Canada.

Licensed under the MIT license.
