'use strict'
/**
 *
 */
const client = require('./client');

module.exports = (json) => {
  return client.post('/api/differential.revision.search', {
    ...json
  }).then(res => res.body.result);
}