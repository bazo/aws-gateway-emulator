import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useRevalidator, useSearchParams } from "@remix-run/react";
import { RequestList } from "components/request-list";
import db from "lib/db.server";
import { Requests } from "types";
import css from "react-json-view-lite/dist/index.css";
export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: css }];
};

const PER_PAGE = 10;

export async function loader({ request }: LoaderFunctionArgs) {
	const page = parseInt(new URL(request.url).searchParams.get("page") ?? "1");

	const offset = (page - 1) * PER_PAGE;

	const { total } = db
		.prepare(`
		select count(*) as total from requests
	`)
		.get() as { total: number };

	const requests = db
		.prepare(`
		select * from requests order by time desc limit ${PER_PAGE} offset ${offset}
	`)
		.all();

	const totalPages = Math.ceil(total / PER_PAGE);

	return {
		requests,
		totalPages,
	};
}

export default function IndexPage() {
	const data = useLoaderData<{ requests: Requests; totalPages: number }>();

	const revalidator = useRevalidator();

	const [searchParams, setSearchParams] = useSearchParams();

	const page = parseInt(searchParams.get("page") || "1");

	return (
		<RequestList
			requests={Requests.parse(data.requests)}
			page={page}
			onPageChange={(page) => {
				setSearchParams((params) => {
					return {
						page: page.toString(),
					};
				});
			}}
			pageCount={data.totalPages}
			onRefresh={() => {
				revalidator.revalidate();
			}}
		/>
	);
}
