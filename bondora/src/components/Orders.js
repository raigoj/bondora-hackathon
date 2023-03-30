import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, category, amount) {
	return { id, date, name, shipTo, category, amount };
}

const rows = [
	createData(0, "16 Mar, 2019", "Netflix", "Tupelo, MS", "Entertainment", 12),
	createData(1, "16 Mar, 2019", "Spotify", "London, UK", "Music", 12),
	createData(2, "16 Mar, 2019", "Hello Fresh", "Boston, MA", "Food", 100),
	createData(3, "16 Mar, 2019", "Amazon Prime", "Gary, IN", "Shopping", 11),
	createData(4, "15 Mar, 2019", "MyFitness", "Long Branch, NJ", "Fitness", 25),
];

function preventDefault(event) {
	event.preventDefault();
}

export default function Orders() {
	return (
		<React.Fragment>
			<Title>On-going subscriptions</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Creditor name</TableCell>
						{/* {/* <TableCell>Ship To</TableCell> */}
						<TableCell>Category</TableCell>
						<TableCell align="right">Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							{/* <TableCell>{row.shipTo}</TableCell>*/}
							<TableCell>{row.category}</TableCell>
							<TableCell align="right">{`$${row.amount}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
				See more orders
			</Link>
		</React.Fragment>
	);
}
