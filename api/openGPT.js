const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-seSLqoBswWB5MQRPicAT0dEX",
  apiKey: process.env.OPEN_GPT_API_KEY,
});
const openai = new OpenAIApi(configuration);

const useOpenGPT = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      'Decide whether a Tweet\'s sentiment is positive, neutral, or negative.\n\nTweet: "I loved the new Batman movie!"\nSentiment:',
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  console.log(response.data.choices);
};

module.exports = { useOpenGPT };
