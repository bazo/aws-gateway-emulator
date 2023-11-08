import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import Layout from "components/layout";

import globalStylesheetUrl from "styles/globals.css";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: globalStylesheetUrl }];
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				{/* All meta exports on all routes will go here */}
				<Meta />

				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />

				{/* All link exports on all routes will go here */}
				<Links />
			</head>
			<body>
				{/* Child routes go here */}
				<Layout>
					<Outlet />
				</Layout>

				{/* Manages scroll position for client-side transitions */}
				{/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
				<ScrollRestoration />

				{/* Script tags go here */}
				{/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
				<Scripts />

				{/* Sets up automatic reload when you change code */}
				{/* and only does anything during development */}
				{/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
				<LiveReload />
			</body>
		</html>
	);
}
