import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class VendorsList extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: [] };
	}

	componentWillUnmount() {
		console.log("Unmount Vendors List");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Vendors List");
		this.fetchAPI("/api/vendors/", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	render() {
		console.log("Render Vendors List");
		const listdata = this.state.data;
		const listItems = listdata.map((d) => (
			<div ref={d.id}>
				<span>{d.id}</span>, <span>{d.name}</span>
			</div>
		));
		return (
			<div>
				<div>{listItems}</div>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
