import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

type $TSFixMe = any;
const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
) => {
	let response: $TSFixMe;
	try {
		const configuration = new Configuration({
			apiKey: process.env.API_KEY,
		});
		const openai = new OpenAIApi(configuration);
		const messages: Array<ChatCompletionRequestMessage> = [
			{
				role: "system",
				content:
					"You are helping a teacher write report card comments for her students",
			},
			{
				role: "user",
				content:
					"Write a report card comment for a decent student in the Mathematics 30-1 class who is very attentive but doesn't practice enough at home.",
			},
		];
		response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
		});
		const completion = response.data.choices[0].message?.content;
		return {
			statusCode: 200,
			body: JSON.stringify({ completion }),
		};
	} catch (e) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: e, response }),
		};
	}
};
export { handler };
