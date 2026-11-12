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
