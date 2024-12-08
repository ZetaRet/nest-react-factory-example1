import React from "react";

export default function InvoiceViewParts({ data, removeHandler }) {
	const listItems = data.map((d) => (
		<tr key={d.id} className="tableitem">
			<td>{d.id}</td>
			<td>{d.store_id}</td>
			<td>{d.parts_id}</td>
			<td>{d.name}</td>
			<td>{d.type}</td>
			<td>{d.model}</td>
			<td>{d.vendor_id}</td>
			<td>{d.vendor_name}</td>
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
					<th>Store Id</th>
					<th>Part Id</th>
					<th>Name</th>
					<th>Type</th>
					<th>Model</th>
					<th>Vendor Id</th>
					<th>Vendor Name</th>
					<th>Price</th>
					<th>Count</th>
					{removeHandler && <th></th>}
				</tr>
				{listItems}
			</table>
		</div>
	);
}
