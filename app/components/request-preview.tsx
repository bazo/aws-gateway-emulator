import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";

import { Request } from "types";

interface RequestPreviewProps {
	request: Request | null;
}

export function RequestPreview({ request }: RequestPreviewProps) {
	if (!request) {
		return null;
	}

	const event = JSON.parse(request.request);

	let showJsonResponse = true;
	let response = request.response;

	try {
		response = JSON.parse(request.response);
	} catch (e) {
		console.log(e);
		showJsonResponse = false;
	}
	return (
		<>
			<h2 className="text-lg font-medium mb-4">
				{request.method} {request.path} -&gt; {request.lambda} ({request.duration.toFixed(2)}ms)
			</h2>
			<div className="space-y-4">
				<div>
					<h3 className="text-md font-semibold mb-2">Request</h3>
					<h4>Headers</h4>
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
						<JsonView data={event.headers} shouldExpandNode={allExpanded} style={darkStyles} />
					</div>

					<h4>Body</h4>
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
						<JsonView data={JSON.parse(event.body)} shouldExpandNode={allExpanded} style={darkStyles} />
					</div>
				</div>
				<div>
					<h3 className="text-md font-semibold mb-2">Response</h3>
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
						{showJsonResponse ? <JsonView data={response} shouldExpandNode={allExpanded} style={darkStyles} /> : <pre>{response}</pre>}
					</div>
				</div>
			</div>
		</>
	);
}
