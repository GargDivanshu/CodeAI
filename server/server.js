import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeaAI!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // iska meaning teh risk models will take and thus the erroes
      max_tokens: 3000, //kuch tokens jo a model takes whille generating response. Read more about it
      top_p: 1, //Read about this
      frequency_penalty: 0.5, // positive main value if is zyada then it wont let the model make same response many times
      presence_penalty: 0, // greater the number greater the chance ki model new topics khud se layega in convo
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Error!!!!  Something went wrong.');
  }
})

app.listen(5000, () => console.log('http://localhost:5000'))
