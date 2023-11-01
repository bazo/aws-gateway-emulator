import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readSettings } from "lib/routes.server";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
	return readSettings();
}

export default function List() {
	const routes = useLoaderData<typeof loader>();

	console.log({ report: routes });

	return (
		<div>
			{routes.map((route) => {
				return Object.entries(route).map(([path, data]) => {
					return <div key={`${path}-${JSON.stringify(data)}`}>{path}</div>;
				});
			})}
		</div>
	);
}
