const _ = require('lodash');
const client = require('./client');

module.exports = async (objectName) => {
  return client.post('/api/phid.lookup', {
    names: _.isArray(objectName) ? objectName : [objectName]
  }).then(res => res.body.result);
}
