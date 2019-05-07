// Skip these keys when copying to the new error object
const SKIP_KEYS = new Set([
  'stack'
]);

module.exports = (e) => {
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
