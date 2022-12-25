const axios = require("axios");

const useOpenGPT = async (temp, no) => {
  const response = await axios({
    method: "post",
    url: "https://api.openai.com/v1/completions",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_GPT_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      model: "text-davinci-003",
      prompt: `list ${no} clothes to wear on a ${temp} day in numbers`,
      temperature: 1,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    },
  });
  return response;
};

module.exports = useOpenGPT;
