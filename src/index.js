const Telegram = require('./telegram');
const keys = require('./config/keys');
const { Configuration, OpenAIApi } = require('openai');

const main = async () => {
  try {
    const configuration = new Configuration({
      organization: keys.OPENAI_ORG_ID,
      apiKey: keys.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const telegram = new Telegram(keys.TELEGRAM_TOKEN, openai);
    telegram.start();
  } catch (e) {
    console.error(e);
  }
}

main();