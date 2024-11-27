import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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
		</div>
	);
};

const Vendors = () => {
	return (
		<div>
			<h2>Vendors</h2>
		</div>
	);
};

const Vehicles = () => {
	return (
		<div>
			<h2>Vehicles</h2>
		</div>
	);
};

const Store = () => {
	return (
		<div>
			<h2>Store</h2>
		</div>
	);
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
					<Route path="/mobile_parts/" element={<MobileParts />} />
					<Route path="/vendors/" element={<Vendors />} />
					<Route path="/vehicles/" element={<Vehicles />} />
					<Route path="/store/" element={<Store />} />
					<Route path="/invoices/" element={<Invoices />} />
				</Routes>
			</Router>
		</div>
	);
}
