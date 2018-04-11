const _ = require('lodash');
const { SlackBot, FileSessionStore, SlackHandler } = require('bottender');
const { createServer } = require('bottender/express');
const handlers = require('./handlers');

const config = require('./bottender.config.js').slack;

const bot = new SlackBot({
  ...config,
  sessionStore: new FileSessionStore(),
});

const regex = {
  basicObj: /\{[DT]\d+\}/g,
}

const handler = new SlackHandler()
  .onText(regex.basicObj, async context => {
    const response = await handlers.fetchObjectInfo(context.event.text) ;
    await context.sendText(response);
  })
  .onEvent(async context => {
    let res;
    if (context.event.isText) {
      res = await handlers.text(context, context.event.text, context.event.user);
    }
    if (res) {
      await context.sendText(res);
    }
  });

bot.onEvent(handler);
bot.createRtmRuntime();

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
