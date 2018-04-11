
function handleText(context, text, from) {
  console.log(context.session);
  return 'Hello';
}

module.exports = handleText;