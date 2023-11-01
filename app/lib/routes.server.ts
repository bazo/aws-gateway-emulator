import fs from "fs";

import path from "path";
import yaml from "yaml";
import lambdaLocal from "lambda-local";

const fileName = process.env.API_DEFINITIONS_FILE;
const lambdaDir = process.env.LAMBDA_DIR;

console.log({fileName, lambdaDir})

type Settings = {
	apis: {
		[endpoint: string]: {
			[method: string]: string;
		};
	};
	lambdas: {
		[lambdaName: string]: {
			path: string;
			handler?: string;
			env?: Record<string, string>
		};
	};
};

export function readSettings(): Settings {
	if (!fileName) {
		return { apis: {}, lambdas: {} };
	}
	const src = fs.readFileSync(fileName).toString();
	return yaml.parse(src);
}

export async function callLambda(request: Request) {
	const settings = readSettings();

	console.log({settings})

	const routes = settings.apis;
	const url = new URL(request.url);

	const urlpath = url.pathname.substring(4);

	const route = routes[urlpath];

	const lambdaName = route[request.method];

	const lambda = settings.lambdas[lambdaName];

	const body = await request.text();

	const event = {
		headers: Object.fromEntries(request.headers.entries()),
		body,
	};

	return lambdaLocal.execute({
		event,
		lambdaPath: path.join(lambdaDir ?? __dirname, lambda.path),
		//profilePath: '~/.aws/credentials',
		//profileName: 'default',
		esm: true,
		environment: lambda.env ?? {},
		//timeoutMs: 3000,
		lambdaHandler: lambda.handler ?? "handler",
	});
}
