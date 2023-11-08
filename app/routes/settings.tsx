import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import css from "react-json-view-lite/dist/index.css";
import { readSettings } from "lib/routes.server";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: css }];
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
	return readSettings();
}

export default function SettingsPage() {
	const routes = useLoaderData<typeof loader>();

	console.log({ report: routes });

	return (
		<div className="grid grid-cols-2 gap-4 px-4">
			<div>
				{Object.entries(routes.lambdas).map(([name, settings]) => {
					return (
						<>
							<h2 className="text-lg font-medium mb-4">{name}</h2>
							<div className="space-y-4">
								<div>
									<h3 className="text-md font-semibold mb-2">Settings</h3>
									<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm overflow-x-auto">
										<JsonView data={settings} shouldExpandNode={allExpanded} style={darkStyles} />
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
			<div>
				<h2 className="text-lg font-medium mb-4">Path mappings</h2>
				{Object.entries(routes.apis).map(([path, paths]) => {
					return Object.entries(paths).map(([method, lambda]) => {
						return (
							<div className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
								{method} {path} -&gt; {lambda}
							</div>
						);
					});
				})}
			</div>
		</div>
	);
}
