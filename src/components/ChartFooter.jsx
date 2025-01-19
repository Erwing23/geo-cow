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
  const yValuesPasos = geoMessagesByNode.map((item) => item.pasos);
  const yValuesTemp = geoMessagesByNode.map((item) => item.temperature);
  console.log(yValuesTemp);
  const dateFormatter = (tick) => {
    const date = new Date(tick);
    // Example format: "MM/dd/yyyy HH:mm"
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    }); // Adjust the formatting based on your locale
  };
  return (
    <Box
      display="flex"
      style={{
        height: "25vh", // Full viewport height
        backgroundColor: "white",
      }}
    >
      {xTicks.length > 6 ? (
        <>
          <LineChart
            yAxis={[{ label: "Pasos y Temperatura" }]}
            xAxis={[
              {
                data: xTicks,
                valueFormatter: dateFormatter,
                label: "Tiempo",
                scaleType: "date",
              },
            ]}
            series={[
              {
                color: "black",
                curve: "linear",
                data: yValuesPasos,
              },
              {
                color: "red",
                curve: "linear",
                data: yValuesTemp,
              },
            ]}
            width={1600}
            height={300}
          />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
