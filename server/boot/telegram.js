'use strict'

const Telegraf = require('telegraf')

// process.env.TELEGRAM_BOT_TOKEN
// process.env.TELEGRAM_ALLOWED_USERS

module.exports = function(app) {
    const Note = app.models.Note
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
    const usersAllowed = process.env.TELEGRAM_ALLOWED_USERS ? process.env.TELEGRAM_ALLOWED_USERS.split(',') : []

    // filter by users
    bot.use((ctx, next) => {
        if (usersAllowed.includes(ctx.from.username)) next()
        else {
            console.log(`${ctx.from.username} tried to use this bot`)
            ctx.reply('You do not have access to this bot. Go away!')
        }
    })

    // store message in DB
    bot.on('text', async (ctx) => {
        if (ctx.message && ctx.message.text) {
            const note = await Note.create({
                created_at: new Date(),
                body: ctx.message.text
            })

            if (note.id) ctx.reply(`Written ${ctx.message.text.length} characters`)
            else ctx.reply('Error while writing to DB')
        }
    })

    bot.launch()

    console.log('Telegram Bot Started!')
}