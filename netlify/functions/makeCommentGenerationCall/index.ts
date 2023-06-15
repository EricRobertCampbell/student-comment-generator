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
		const { student, options } = JSON.parse(event.body);
		const configuration = new Configuration({
			apiKey: process.env.API_KEY,
		});
		const openai = new OpenAIApi(configuration);
		const prompt =
			`Write a report card comment for a ${student.quality} student, ${student.name}` +
			(options.className ? `, in the ${options.className} class.` : ".") +
			(student.strengths
				? `Their strengths are '${student.strengths}'.`
				: "") +
			(student.weaknesses
				? `Their weaknesses are '${student.weaknesses}'.`
				: ``) +
			(student.roughComment
				? `The comment should roughly say ${student.roughComment}.`
				: ``) +
			// (options.wordLimit
			// 	? `The comment should be no more than ${options.wordLimit} words.`
			// 	: "") +
			(options.lastComment
				? `This is the final comment of the year, and should be in the past tense.`
				: "") +
			" Avoid the first person." +
			"Please use he or she for all pronouns.";
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
