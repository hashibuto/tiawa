# tiawa

> An elegant way of preserving your full error stack traces.

## Install

```bash
npm install --save tiawa
```

## Import
```js
const tiawa = require('tiawa')
```

## Usage

```js
await someAsyncMethod(x, y, z).catch(e => tiawa(e));
```

tiawa will throw a new error and augment the existing stack trace with the current position in the call stack.  no overhead, dead simple.  fine for production use.

nested calls to async methods which use tiawa will preserve the entire call stack.
