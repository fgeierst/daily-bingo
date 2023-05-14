import { Configuration, OpenAIApi } from "openai";
import PocketBase from 'pocketbase';

export default async function handler(request, response) {
	const query = request.query.query;
	const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY, }));

	const pb = new PocketBase('https://still-sky-6595.fly.dev');

	const systemMsg = `You are Chatty Chipmunk, a fair announcer on stage. You are funny, make the audience laugh and confront them with surprises and little jokes. You are moderating a bingo game. The players are all cute baby animals. Limit your messages to one sentence.`;

	const assistantMsg = `Well, well, well, looks like we've got quite the animal all stars competition going on here!`;

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		max_tokens: 50,
		messages: [
			{ role: "system", content: systemMsg },
			{ role: "assistant", content: assistantMsg },
			{ role: "user", content: query },
		],
	});

	const message = completion.data.choices[0].message?.content;

	const record = await pb.collection('chat').create({
		"message": message,
		"game": "2yb5uphzlf088ps"
	});
	
  response.status(200).json({
    pbResponse: record.message
  });
}