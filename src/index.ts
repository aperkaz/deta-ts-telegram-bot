import express from "express";
import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// config the bot
bot.hears("hi", (ctx) => ctx.reply("Hey Jeffee!"));

// Set the bot API endpoint: https://api.telegram.org/bot{my_bot_token}/setWebhook?url={BOT_WEBHOOK_URL}{BOT_WEBHOOK_CALLBACK_PATH}
bot.telegram.setWebhook(
  `${process.env.BOT_WEBHOOK_URL}${process.env.BOT_WEBHOOK_CALLBACK_PATH}`
);

// Setup Express
const app = express();
app.get("/", (req, res) => res.send("✅ Bot server okay!"));
app.use(bot.webhookCallback(process.env.BOT_WEBHOOK_CALLBACK_PATH));

// When running locally
if (!process.env.DETA_RUNTIME) {
  app.listen(3000, () => console.log("Started on http://localhost:3000"));
}

module.exports = app;
