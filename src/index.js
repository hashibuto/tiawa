module.exports = (e) => {
  const newError = new Error(e.message);
  newError.__proto__.name = e.__proto__.name;
  newError.stack = [
    ...e.stack.split('\n'),
    ...newError.stack.split('\n').slice(2)
  ].join('\n');

  throw newError;
}
