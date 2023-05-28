import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

type $TSFixMe = any;
const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
) => {
	let response: $TSFixMe;
	try {
		console.log(event.body);
		// @ts-expect-error
		const studentInfo = JSON.parse(event.body);
		const configuration = new Configuration({
			apiKey: process.env.API_KEY,
		});
		const openai = new OpenAIApi(configuration);
		const prompt =
			`Write a report card comment for a ${studentInfo.quality} student, ${studentInfo.name}, in the Mathematics 30-1 class.` +
			(studentInfo.strengths
				? `Their strengths are ${studentInfo.strengths}.`
				: "") +
			(studentInfo.weaknesses
				? `Their weaknesses are ${studentInfo.weaknesses}.`
				: ``) +
			(studentInfo.roughComment
				? `The comment should roughly say ${studentInfo.roughComment}.`
				: ``);
		const messages: Array<ChatCompletionRequestMessage> = [
			{
				role: "system",
				content:
					"You are helping a teacher write report card comments for her students",
			},
			{
				role: "user",
				content: prompt,
			},
		];
		console.log(`About to make ChatGPT call with ${prompt}`);
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
