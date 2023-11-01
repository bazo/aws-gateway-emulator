import { ActionFunctionArgs } from "@remix-run/node";
import { callLambda } from "lib/routes.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	const res = await callLambda(request);

	return new Response(res.body, {
		status: res.statusCode,
	});
};
