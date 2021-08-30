const { Telegraf } = require('telegraf')

require('dotenv').config()
const { TELEGRAM_API_TOKEN } = process.env
const data = require('./data')

const bot = new Telegraf(TELEGRAM_API_TOKEN)


bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, "I know so many stories about SUTD!!!11!",
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Tell me something about SUTD!", callback_data: "get_tea"}]
            ]
        }
    })
})

bot.help((ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, "I know so many stories about SUTD!!!11!",
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Tell me something about SUTD!", callback_data: "get_tea"}]
            ]
        }
    })
})

bot.help((ctx) => ctx.reply('Send me a sticker'))

bot.action("get_tea", (ctx) => {
    tea = get_tea();
    ctx.reply(tea);
})

function get_tea() {
    n = data.scams.length;
    random_int = Math.floor(Math.random() * n);

    return data.scams[random_int];
}


bot.on('text', (ctx) => {
    ctx.telegram.sendMessage(ctx.message.chat.id, get_tea())
  
})


bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
