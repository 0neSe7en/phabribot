const _ = require('lodash');
const userNameIdMap = new Map();
const idNameMap = new Map();

function getUsernameById(session, userId) {
  return _.find(session.team.members, {id: userId})
}

function getBot(session, botName) {
  if (idNameMap.get(botName)) {
    return idNameMap.get(botName);
  }
  const bot = _.find(session.team.members, {name: botName});
  if (bot) {
    userNameIdMap.set(bot.id, bot);
    idNameMap.set(bot.name, bot);
  }
  return bot;
}

module.exports = {
  getUsernameById,
  getBot,
}
