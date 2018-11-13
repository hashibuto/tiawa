module.exports = (e) => {
  if (!(e instanceof Error)) {
    throw e;
  }

  const newError = new Error(e.message);
  newError.stack = [
    ...e.stack.split('\n'),
    ...newError.stack.split('\n').slice(2)
  ].join('\n');

  throw newError;
}
