@test-ui/ember
==============================================================================

[![Build Status](https://travis-ci.org/mike-north/test-ui-ember.svg?branch=master)](https://travis-ci.org/mike-north/test-ui-ember)
[![Version](https://img.shields.io/npm/v/@test-ui/ember.svg)](https://www.npmjs.com/package/@test-ui/ember)

[Test-UI](https://github.com/mike-north/test-ui-core) support for [QUnit](https://qunitjs.com/) or [Mocha](https://mochajs.org/) tests in [Ember.js](https://www.emberjs.com/) apps

Installation
------------------------------------------------------------------------------

```
ember install @test-ui/ember
```


Usage
------------------------------------------------------------------------------

#### The `{{test-ui-frame}}` component

Use the `{{test-ui-frame}}` component in your `application.hbs` template, optionally passing in a filter to describe a subset of tests to run

```hbs
<!-- Run Only ESLint Tests -->
{{test-ui-frame
  filter='ESLint'}}
```

Typically, it's desirable to receive data from the tests as/after they run. This component yields a [simple Observable](https://github.com/mike-north/micro-observable) that you may subscribe to

```hbs
{{/test-ui-frame filter='ESLint' as |api|}}
  {{data-receiver-component
    observable=api.data}}
{{/test-ui-frame}}
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd @test-ui/ember`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [BSD 2-Clause License](LICENSE.md).
(c) 2018 LinkedIn
