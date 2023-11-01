// import { CalendarDateRangePicker } from "@/app/examples/dashboard/components/date-range-picker"
import { MainNav } from "components/main-nav";
import { PropsWithChildren } from "react";
// import { Search } from "@/app/examples/dashboard/components/search"
// import TeamSwitcher from "@/app/examples/dashboard/components/team-switcher"

export default function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<div className="hidden flex-col md:flex">
				<div className="border-b">
					<div className="flex h-16 items-center px-4">
						{/* <TeamSwitcher />*/}
						<img src="/logo.png" width={179} alt="Dashboard" />
						<MainNav className="mx-6" />
						<div className="ml-auto flex items-center space-x-4">{/* <Search />*/}</div>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
