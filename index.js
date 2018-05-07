const pino = require('pino')();
const {SlackBot, FileSessionStore, SlackHandler} = require('bottender');
const {createServer} = require('bottender/express');
const utils = require('./utils');

const handlers = require('./handlers');
const config = require('./bottender.config.js').slack;

const bot = new SlackBot({
  ...config,
  sessionStore: new FileSessionStore(),
});

const regex = {
  basicObj: /\{[DT]\d+\}/g,
  recentDiffOfAuthor: /<@(.+)>\s+((D|d)(iff)?)\s+(.+)\s+(\d+)/, // {author limit}
}

const handler = new SlackHandler()
  .onText(regex.basicObj, async context => {
    const response = await handlers.fetchObjectInfo(context.event.text);
    await context.sendText(response);
  })
  .onText(regex.recentDiffOfAuthor, async (ctx) => {
    const bot = utils.slack.getBot(ctx.session, process.env.BOTNAME);
    if (!bot) {
      pino.error('Can not found bot?');
      return;
    }
    const matches = ctx.event.text.match(regex.recentDiffOfAuthor);
    if (!matches) {
      return;
    }
    if (matches[1] !== bot.id) {
      return;
    }
    const response = await handlers.diffOfAuthor(matches)
    await ctx.sendText(response)
  })

bot.onEvent(handler);
bot.createRtmRuntime();

const server = createServer(bot);

server.listen(5000, () => {
  pino.info('server is running on 5000 port...');
});
