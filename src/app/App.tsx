import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ConfigurationPage } from "../pages/configuration-page";
import { SchedulePage } from "../pages/schedule-page";
import { Header } from "../shared/ui/header";

const MAIN_NAV_ITEMS = [
	{ id: "schedule", label: "Расписание", href: "/schedule" },
	{ id: "configuration", label: "Конфигурация", href: "/configuration" }
] as const;

type MainPageId = (typeof MAIN_NAV_ITEMS)[number]["id"];

export function App() {
	const location = useLocation();
	const navigate = useNavigate();

	const activePageId: MainPageId =
		(MAIN_NAV_ITEMS.find((item) => item.href === location.pathname)?.id as MainPageId) ?? "schedule";

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Header
				navItems={MAIN_NAV_ITEMS}
				activeItemId={activePageId}
				onNavItemClick={(id) => {
					const item = MAIN_NAV_ITEMS.find((navItem) => navItem.id === id);
					if (item?.href) {
						navigate(item.href);
					}
				}}
			/>

			<main className="px-8 py-6">
				<Routes>
					<Route path="/" element={<Navigate to="/schedule" replace />} />
					<Route path="/schedule" element={<SchedulePage />} />
					<Route path="/configuration" element={<ConfigurationPage />} />
				</Routes>
			</main>
		</div>
	);
}
