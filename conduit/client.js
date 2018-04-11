require('dotenv').config();
const axios = require('axios');
const qs = require('query-string');

const instance = axios.create({
  baseURL: process.env.PHABRICATOR_DOMAIN,
  method: 'POST',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
})

module.exports = {
  instance,
  post(url, args) {
    return instance.post(url, qs.stringify({
      'api.token': process.env.CONDUIT_TOKEN,
      ...args
    }, { arrayFormat: 'index' }))
  }
};
