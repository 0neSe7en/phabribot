require('dotenv').config();
const superagent = require('superagent');
const url = require('url');

const baseURL = process.env.PHABRICATOR_DOMAIN;

function post(api, args) {
  return superagent
    .post(url.resolve(baseURL, api))
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      'api.token': process.env.CONDUIT_TOKEN,
      ...args
    })
}

module.exports = {
  post,
};
