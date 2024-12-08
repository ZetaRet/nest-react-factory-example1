import React from "react";

export default function InvoiceViewDataTable({ data }) {
	return (
		<div className="invoice_view_div">
			<table>
				<tr>
					<td>
						<label>Invoice Id: </label>
					</td>
					<td>
						<span>{data ? data.id : ""}</span>
					</td>
				</tr>
				<tr>
					<td>
						<label>Client: </label>
					</td>
					<td>
						<span>{data ? data.client : ""}</span>
					</td>
				</tr>
				<tr>
					<td>
						<label>Created: </label>
					</td>
					<td>
						<span>{data ? data.format_created_at : ""}</span>
					</td>
				</tr>
				<tr>
					<td>
						<label>Updated: </label>
					</td>
					<td>
						<span>{data ? data.format_updated_at : ""}</span>
					</td>
				</tr>
				<tr>
					<td>
						<label>Total: </label>
					</td>
					<td>
						<span>{data && data.final ? data.total : "-"}</span>
					</td>
				</tr>
				<tr>
					<td>
						<label>Status: </label>
					</td>
					<td>
						<span>{data && data.final ? "Final" : "Pending"}</span>
					</td>
				</tr>
			</table>
		</div>
	);
}
