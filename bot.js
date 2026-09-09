import { Telegraf } from 'telegraf'

const token = (process.env.TELEGRAM_BOT_TOKEN || '8979857832:AAEKQSw8Vs4Hjgzb4bbfI6zRemcYUUyMY7s').trim()
const backendUrl = (process.env.BACKEND_URL || 'https://financetex.relaxdev.ru/api/telegram').replace(/\/+$/, '')

console.log('🌿 [Listok Bot] Starting Telegraf bot worker...')
console.log('🔗 Backend URL:', backendUrl)

const bot = new Telegraf(token)

// Middleware: перенаправляет все входящие события (команды /start, чеки, текст) на бэкенд Листка
bot.use(async (ctx, next) => {
  if (!ctx.update) return next()

  try {
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(ctx.update),
    })

    if (ctx.callbackQuery) {
      await ctx.answerCbQuery().catch(() => {})
    }

    const reply = await res.json().catch(() => null)

    if (reply && (reply.method === 'sendMessage' || reply.text)) {
      const extra = {
        parse_mode: reply.parse_mode || 'HTML',
      }
      if (reply.reply_markup) {
        extra.reply_markup = reply.reply_markup
      }
      await ctx.reply(reply.text, extra)
    }
  } catch (err) {
    console.error('❌ Ошибка отправки на бэкенд:', err.message)
  }

  return next()
})

bot.launch().then(() => {
  console.log('✅ Telegraf бот запущен на RelaxDev и ожидает сообщений!')
}).catch((err) => {
  console.error('❌ Ошибка запуска Telegraf бота:', err)
})

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
