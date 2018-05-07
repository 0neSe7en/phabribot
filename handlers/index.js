const _ = require('lodash');
const pino = require('pino')();
const conduit = require('../conduit');
const baseURL = process.env.PHABRICATOR_DOMAIN

async function fetchObjectInfo(text, formatFunc) {
  let objects = text.match(/[DT]\d+/g);
  if (!objects) { return null; }
  const result = await conduit.lookup(objects);
  pino.info(result)
  if (formatFunc) {
    return _.map(result, formatFunc).join('\n');
  } else {
    return _.map(result, (v, objName) => {
      return `*${objName}* _${v.status}_ : ${v.fullName.slice(objName.length + 1)} \n${v.uri}`
    }).join('\n')
  }
}

async function diffOfAuthor(matches) {
  const [origin, botId, objectType, , , author, limit] = matches;
  const result = await conduit.searchRevision({
    queryKey: 'active',
    constraints: {
      authorPHIDs: [author],
    },
    limit,
  })
  pino.info(result)
  const data = result.data
  if(data.length === 0){
    return `No Open Differential Of ${author}`
  }
  return data.map((revision) => {
    return `*D${revision.id}* ${revision.fields.title}\n ${baseURL}/D${revision.id}`
  }).join('\n')
}

module.exports = {
  fetchObjectInfo,
  diffOfAuthor,
}