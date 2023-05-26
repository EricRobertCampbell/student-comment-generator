import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
	event: HandlerEvent,
	context: HandlerContext
) => {
	return {
		statusCode: 200,
		body: JSON.stringify({ Hello: process.env.API_KEY }),
	};
};
export { handler };
