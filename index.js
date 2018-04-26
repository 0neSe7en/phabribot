const pino = require('pino')();
const {SlackBot, FileSessionStore, SlackHandler} = require('bottender');
const {createServer} = require('bottender/express');

const handlers = require('./handlers');
const config = require('./bottender.config.js').slack;

const bot = new SlackBot({
  ...config,
  sessionStore: new FileSessionStore(),
});

const regex = {
  basicObj: /\{[DT]\d+\}/g,
  recentDOfAuthor: /\{.+ \d+\}/g, // {author limit}
}

const handler = new SlackHandler()
  .onText(regex.basicObj, async context => {
    const response = await handlers.fetchObjectInfo(context.event.text);
    await context.sendText(response);
  })
  .onText(regex.recentDOfAuthor, async (ctx) => {
    const response = await handlers.DOfAuthor(ctx.event.text)
    await ctx.sendText(response)
  })

bot.onEvent(handler);
bot.createRtmRuntime();

const server = createServer(bot);

server.listen(5000, () => {
  pino.info('server is running on 5000 port...');
});
