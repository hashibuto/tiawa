# tiawa

> Long stack traces for async methods.

## Background

a major headache of node.js is the difficulty in obtaining a full stack trace when errors are thrown within asynchronous methods, making spotting the source of the error very difficult when dealing with highly reused methods.  tiawa makes handling this problem simpler by throwing a new error with a stack trace modified to contain the original error.  this still requires the programmer to add an explicit 'catch' to each asynchronous method, but aleviates the burden of manually logging and re-throwing a new error.

## Install

```bash
npm install --save tiawa
```

## Import
```js
const tiawa = require('tiawa')
```

## Usage

Tiawa can be used in two ways, first, to grab the response/error so that it can be processed in the current call stack:

```js
  const result = await tiawa(
    myAsyncMethod(x, y, z)
  );

  if (result.error !== null) {
    // Either handle error, or re-throw
    throw result.error;
  }

  console.log(result.result);
```

Or alternatively, to round up the full stack trace, and re-throw:

```js
await someAsyncMethod(x, y, z).catch(e => tiawa(e));
```

tiawa will throw a new error and augment the existing stack trace with the current position in the call stack.  no overhead, dead simple.  fine for production use.

nested calls to async methods which use tiawa will preserve the entire call stack so that the programmer knows the full origin of the async call that's failing.
