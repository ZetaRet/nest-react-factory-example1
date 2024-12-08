import React from "react";

export default function InvoiceViewServices({ data, removeHandler }) {
	const listItems = data.map((d) => (
		<tr key={d.id} className="tableitem">
			<td>{d.id}</td>
			<td>{d.service_id}</td>
			<td>{d.name}</td>
			<td>{d.price}</td>
			<td>{d.count}</td>
			{removeHandler && (
				<td>
					<a dataid={d.id} className="row-remove" onClick={() => removeHandler(d)}>
						remove
					</a>
				</td>
			)}
		</tr>
	));
	return (
		<div className="tablediv">
			<table>
				<tr className="tablehead">
					<th>Id</th>
					<th>Service Id</th>
					<th>Name</th>
					<th>Price</th>
					<th>Count</th>
					{removeHandler && <th></th>}
				</tr>
				{listItems}
			</table>
		</div>
	);
}
