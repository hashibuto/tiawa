// Skip these keys when copying to the new error object
class ResultObject {
  constructor(result, error) {
    this.result = result;
    this.error = error;
  }
}

const SKIP_KEYS = new Set([
  'stack'
]);

module.exports = (e) => {
  // Cheap promise/async detection
  if (e.hasOwnProperty('then')) {
    return e
    .then(result => new ResultObject(result, null))
    .catch(error => new ResultObject(null, error))
  }

  // Alternative use, capture full stack-trace and re-throw
  if (!(e instanceof Error)) {
    throw e;
  }

  const newError = new Error(e.message);
  newError.stack = [
    ...e.stack.split('\n'),
    ...newError.stack.split('\n').slice(2)
  ].join('\n');

  for (let key in e) {
    if (!SKIP_KEYS.has(key)) {
      newError[key] = e[key];
    }
  }

  throw newError;
}
