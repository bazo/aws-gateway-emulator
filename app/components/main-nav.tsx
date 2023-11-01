import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { NavLink } from "@remix-run/react";

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	return (
		<nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
			<NavLink
				to="/"
				className={({ isActive, isPending }) =>
					`text-sm font-medium transition-colors hover:text-primary${isActive ? "" : " text-muted-foreground"}`
				}
			>
				Overview
			</NavLink>
			<NavLink
				to="/receipts"
				className={({ isActive, isPending }) =>
					`text-sm font-medium transition-colors hover:text-primary${isActive ? "" : " text-muted-foreground"}`
				}
			>
				Customers
			</NavLink>
			
			<NavLink
				to="/settings"
				className={({ isActive, isPending }) =>
					`text-sm font-medium transition-colors hover:text-primary${isActive ? "" : " text-muted-foreground"}`
				}
			>
				Settings
			</NavLink>
		</nav>
	);
}
