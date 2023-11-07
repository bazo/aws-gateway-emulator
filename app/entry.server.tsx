import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";
import db from "lib/db.server";

const ABORT_DELAY = 5_000;

console.log("running entry.server.tsx");
try {
	const res = db
		.prepare(`
			CREATE TABLE requests (
				id       INTEGER PRIMARY KEY AUTOINCREMENT,
				method   TEXT    NOT NULL,
				path     TEXT    NOT NULL,
				code     INTEGER NOT NULL,
				request  TEXT    NOT NULL,
				lambda   TEXT    NOT NULL,
				response TEXT 	 NOT NULL,
				time     TEXT    NOT NULL DEFAULT (datetime('now') ),
				duration INTEGER NOT NULL
			);
			
			`)
		.run();
	console.log(res);
} catch (e) {
	if (e instanceof Error) {
		console.log(e.message);
	}
}

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	loadContext: AppLoadContext,
) {
	return handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

function handleBrowserRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />, {
			onShellReady() {
				shellRendered = true;
				const body = new PassThrough();
				const stream = createReadableStreamFromReadable(body);

				responseHeaders.set("Content-Type", "text/html");

				resolve(
					new Response(stream, {
						headers: responseHeaders,
						status: responseStatusCode,
					}),
				);

				pipe(body);
			},
			onShellError(error: unknown) {
				reject(error);
			},
			onError(error: unknown) {
				responseStatusCode = 500;
				// Log streaming rendering errors from inside the shell.  Don't log
				// errors encountered during initial shell rendering since they'll
				// reject and get logged in handleDocumentRequest.
				if (shellRendered) {
					console.error(error);
				}
			},
		});

		setTimeout(abort, ABORT_DELAY);
	});
}
