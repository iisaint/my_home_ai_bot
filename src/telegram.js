const TelegramBot = require('node-telegram-bot-api');
const {MSG_HELP} = require('./message');


module.exports = class Telegram {
  constructor(token, openai, delay) {
    this.bot = new TelegramBot(token, {polling: true});
    this.delay = delay;
    this.openai = openai;
  }

  async start () {
    this.bot.onText(/\/start/, (msg, match) => {
      this.bot.sendMessage(msg.chat.id, MSG_HELP());
    });

    this.bot.onText(/\/help/, (msg, match) => {
      this.bot.sendMessage(msg.chat.id, MSG_HELP());
    });

    this.bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      console.log(msg);
      try {
        const completion = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: `${msg.text}`}],
        });
        console.log(completion.data.choices[0].text);
        this.bot.sendMessage(chatId, completion.data.choices[0].message.content);
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
        this.bot.sendMessage(chatId, 'Error!!');
      }
      
    });
  }

}