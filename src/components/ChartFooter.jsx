import { useCallback, useMemo } from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "@mui/x-charts";
export default function ChartFooter({ geoMessagesByNode }) {
  // Map options to disable default UI elements
  const xTicks = geoMessagesByNode.map((item) => new Date(item.recievedAt)); // X-axis data (dates)
  const yValues = geoMessagesByNode.map((item) => item.pasos);
  console.log(yValues);
  console.log(xTicks);

  const dateFormatter = (tick) => {
    const date = new Date(tick);
    // Example format: "MM/dd/yyyy HH:mm"
    return date.toLocaleString(); // Adjust the formatting based on your locale
  };
  return (
    <Box
      style={{
        height: "25vh", // Full viewport height
        backgroundColor: "gray",
      }}
    >
      {xTicks.length > 6 ? (
        <LineChart
          xAxis={[
            {
              data: xTicks,
              valueFormatter: dateFormatter,
              label: "test",
              scaleType: "datetime",
            },
          ]}
          series={[
            {
              curve: "linear",
              data: yValues,
            },
          ]}
          width={1000}
          height={300}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
