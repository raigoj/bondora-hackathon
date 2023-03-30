import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
	return { time, amount };
}

const data = [
	createData("Jan", 40),
	createData("Feb", 30),
	createData("Mar", 60),
	createData("Apr", 180),
	createData("May", 140),
	createData("Jun", 170),
	createData("Jul", 10),
	createData("Aug", 20),
	createData("Sep", 10),
	createData("Oct", 10),
	createData("Nov", 10),
	createData("Dec", 10),
];

export default function Chart() {
	const theme = useTheme();

	return (
		<React.Fragment>
			<Title>Monthly spendings</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis
						dataKey="time"
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					/>
					<YAxis
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: "middle",
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Amount (€)
						</Label>
					</YAxis>
					<Line
						isAnimationActive={false}
						type="monotone"
						dataKey="amount"
						stroke={theme.palette.primary.main}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
}
