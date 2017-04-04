# root_require

Hijacks node's module resolution so that you can use a prefixed path to require modules from the project root.

If you want to accomplish this by transforming your code rather than using this runtime node hack, or for bundling for the browser, use [babel-plugin-root-require](https://github.com/m59peacemaker/babel-plugin-root-require).

## install

```sh
$ npm install root_require
```

## example

```js
require('root_require').setRoot()

const myThing = require('~/things/relatively')
```

Starting from your project root, if you have a file `lib/foo.js` and you want to require it from `routes/user/profile`, you would normally write `require('../../../lib/foo')`. With `root_require` initialized, you can just write `require('~/lib/foo')` from anywhere.

## api

### `setRoot(pathToRoot)`

If no argument is given, `setRoot` will look for a package.json and consider the directory it is found in to be the root.

### `setPrefix(prefix)`

The prefix to use to refer to the project root.

```js
require('root_require').setPrefix('TATERS').setRoot()

require('TATERS/foo.js')
```

### `reset()`

Restore module resolution to default behavior. You probably don't ever need to do this.
