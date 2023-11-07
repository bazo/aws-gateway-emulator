import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Requests } from "types";
import { RequesPreview } from "./request-preview";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dayjs.extend(localizedFormat)

interface RequestListProps {
	requests: Requests;
	page: number;
	onPageChange: (page: number) => void;
	pageCount: number;
	onRefresh: () => void
}

const formatDate = (date: Date): string => {
	return dayjs(date).format("L LT");
};

export function RequestList({ requests, page, onPageChange, pageCount, onRefresh }: RequestListProps) {
	const [request, selectRequest] = useState(requests[0] ?? null);

	return (
		<div className="flex flex-col h-screen">
			<header className="flex items-center justify-between px-6 py-4 border-b">
				<h1 className="text-xl font-semibold">API Gateway Dashboard</h1>
				<Button variant="outline" onClick={onRefresh}>Refresh</Button>
			</header>
			<main className="flex flex-1 overflow-hidden">
				<div className="w-full max-w-[600px] border-r overflow-auto">
					<ul className="divide-y">
						{requests.map((request) => {
							return (
								<li
									key={request.id}
									onClick={() => selectRequest(request)}
									className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
								>
									<h2 className="text-lg font-medium">
										{request.method} {request.path} <span className="float-right text-sm">{formatDate(request.time)}</span>
									</h2>
									<p className="text-sm text-gray-500 dark:text-gray-400">{request.code} OK</p>
								</li>
							);
						})}
					</ul>
					<div className="flex justify-between p-4">
						<Button
							variant={page > 1 ? "outline" : "ghost"}
							disabled={page === 1}
							onClick={() => {
								onPageChange(Math.max(page - 1, 0));
							}}
						>
							Previous
						</Button>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Page {page} of {pageCount}
						</p>
						<Button
							variant={page < pageCount ? "outline" : "ghost"}
							disabled={page === pageCount}
							onClick={() => {
								onPageChange(Math.min(page + 1, pageCount));
							}}
						>
							Next
						</Button>
					</div>
				</div>
				<div className="flex-1 p-6 overflow-auto">
					<RequesPreview request={request} />
				</div>
			</main>
		</div>
	);
}
