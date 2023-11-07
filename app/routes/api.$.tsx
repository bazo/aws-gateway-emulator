import { ActionFunctionArgs } from "@remix-run/node";
import db from "lib/db.server";
import { callLambda } from "lib/routes.server";

export const action = async ({ request }: ActionFunctionArgs) => {
	const start = performance.now();
	const res = await callLambda(request);
	const end = performance.now();

	db.prepare(`
		INSERT INTO requests (
			method,
			path,
			code,
			request,
			lambda,
			response,
			duration
		)
		VALUES (
			?,
			?,
			?,
			?,
			?,
			?,
			?
		);

	`).run([request.method, res.urlpath, res.statusCode, JSON.stringify(res.event), res.lambdaName, res.body, end - start]);

	return new Response(res.body, {
		status: res.statusCode,
		headers: {
			'x-execution-time': (end - start).toString()
		}
	});
};
