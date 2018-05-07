# phabribot

[![Build Status](https://travis-ci.org/0neSe7en/phabribot.svg?branch=master)](https://travis-ci.org/0neSe7en/phabribot)
[![Greenkeeper badge](https://badges.greenkeeper.io/0neSe7en/phabribot.svg)](https://greenkeeper.io/)

A phabricator bot for slack.

## Features

- resolve object details by `{Txxx}`, `{Dxxx}`.
- get recent revision by `@phabribot diff author limit`.

## Usage

Move `env.sample` to `.env`, and fill all tokens.

```
$ npm run start
```

## Docker Usage

```
$ docker run -d -e SLACK_TOKEN=xoxb-xxxxx -e SLACK_VERIFICATION=xxxx -e CONDUIT_TOKEN=api-xxx -e PHABRICATOR_DOMAIN=https://example.com phabribot:latest
```

## Environments

- **SLACK_TOKEN**: `xoxb-`
- **SLACK_VERIFICATION**: `xxx`
- **CONDUIT_TOKEN**: `api-`
- **PHABRICATOR_DOMAIN**: `https://phabricator.domain.com`
- **BOTNAME**: `phabribot`
