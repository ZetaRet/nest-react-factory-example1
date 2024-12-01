import React from "react";
import ReactFetchComponent from "./ReactFetchComponent";

export default class MobilePartsList extends ReactFetchComponent {
	constructor(props) {
		super(props);
		this.state = { fetching: false, data: [] };
	}

	componentWillUnmount() {
		console.log("Unmount Parts List");
	}

	componentDidMount() {
		const o = this;
		console.log("Mount Parts List");
		this.fetchAPI("/api/parts/", "GET", null, (d) => {
			o.setState({ fetching: false, data: d });
		});
		o.setState({ fetching: true });
	}

	render() {
		console.log("Render Parts List");
		const listdata = this.state.data;
		const listItems = listdata.map((d) => (
			<div key={d.id} className="listitem">
				<span>{d.id}</span>, <span>{d.name}</span>, <span>{d.type}</span>, <span>{d.model}</span>
			</div>
		));
		return (
			<div>
				<div className="listdiv">{listItems}</div>
				<br />
				<div>Fetching: {this.state.fetching ? "yes" : "no"}</div>
			</div>
		);
	}
}
