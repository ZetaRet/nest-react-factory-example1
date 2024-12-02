import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Outlet, useParams } from "react-router-dom";
import MobilePartsCreate from "./MobilePartsCreate";
import MobilePartsList from "./MobilePartsList";
import VendorsCreate from "./VendorsCreate";
import VendorsList from "./VendorsList";
import VehicleCreate from "./VehicleCreate";
import VehicleList from "./VehicleList";
import VehicleAssembly from "./VehicleAssembly";
import StoreCreate from "./StoreCreate";
import StoreList from "./StoreList";
import StoreEdit from "./StoreEdit";

const Home = () => {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
};

const MobileParts = () => {
	return (
		<div>
			<h2>Mobile Parts</h2>
			<nav>
				<ul>
					<li>
						<Link to="create">Create Parts</Link>
					</li>
					<li>
						<Link to="list">List Parts</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

const Vendors = () => {
	return (
		<div>
			<h2>Vendors</h2>
			<nav>
				<ul>
					<li>
						<Link to="create">Create Vendor</Link>
					</li>
					<li>
						<Link to="list">List Vendors</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

const Vehicles = () => {
	return (
		<div>
			<h2>Vehicles</h2>
			<nav>
				<ul>
					<li>
						<Link to="create">Create Vehicle</Link>
					</li>
					<li>
						<Link to="list">List Vehicle</Link>
					</li>
					<li>
						<Link to="assembly">Assemble Vehicle</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

const Store = () => {
	return (
		<div>
			<h2>Store</h2>
			<nav>
				<ul>
					<li>
						<Link to="create">Create Store Item</Link>
					</li>
					<li>
						<Link to="list">List Store Items</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

const StoreEditWrapper = () => {
	const { storeid } = useParams();
	return <StoreEdit storeid={storeid} />;
};

const Invoices = () => {
	return (
		<div>
			<h2>Invoices</h2>
		</div>
	);
};

export default function App() {
	return (
		<div>
			<h1>Nest + React with Webpack and Router</h1>
			<Router>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/mobile_parts/">Mobile Parts</Link>
						</li>
						<li>
							<Link to="/vendors/">Vendors</Link>
						</li>
						<li>
							<Link to="/vehicles/">Vehicles</Link>
						</li>
						<li>
							<Link to="/store/">Store</Link>
						</li>
						<li>
							<Link to="/invoices/">Invoices</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mobile_parts/" element={<MobileParts />}>
						<Route path="create" element={<MobilePartsCreate />} />
						<Route path="list" element={<MobilePartsList />} />
					</Route>
					<Route path="/vendors/" element={<Vendors />}>
						<Route path="create" element={<VendorsCreate />} />
						<Route path="list" element={<VendorsList />} />
					</Route>
					<Route path="/vehicles/" element={<Vehicles />}>
						<Route path="create" element={<VehicleCreate />} />
						<Route path="list" element={<VehicleList />} />
						<Route path="assembly" element={<VehicleAssembly />} />
					</Route>
					<Route path="/store/" element={<Store />}>
						<Route path="create" element={<StoreCreate />} />
						<Route path="list" element={<StoreList />} />
						<Route path="edit/:storeid/" element={<StoreEditWrapper />} />
					</Route>
					<Route path="/invoices/" element={<Invoices />} />
				</Routes>
			</Router>
		</div>
	);
}
