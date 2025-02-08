import { useCallback, useMemo } from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

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
  let node = "";
  if (xTicks.length >= 1) {
    node = geoMessagesByNode[0].node;
  }
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
      {xTicks.length >= 6 ? (
        <Box sx={{ boxShadow: 5, margin: 0, borderRadius: 5, paddingLeft: 3 }}>
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
        </Box>
      ) : (
        <></>
      )}
      {node == "v3/startlabs-vaquita@ttn/devices/nodo-01/up" && (
        <Box
          flex
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 5,
            borderRadius: 5,
            border: 2,
            borderColor: "red",
            p: 3,
            m: 2,
            width: "25%", // 1/4 of the container
            backgroundColor: "#ffebee", // Light red background
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="red">
            ADVERTENCIA
          </Typography>
          <WarningIcon sx={{ fontSize: 50, color: "red", my: 1 }} />
          <Typography variant="body1" color="black">
            Fuera de rango
          </Typography>
        </Box>
      )}

      {node == "v3/startlabs-vaquita@ttn/devices/nodo-02/up" && (
        <Box
          flex
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 5,
            borderRadius: 5,
            border: 2,
            borderColor: "green",
            p: 3,
            m: 2,
            width: "25%", // 1/4 of the container
            backgroundColor: "#90EE90", // Light red background
          }}
        >
          <Typography variant="h6">
            <strong>Temperatura:</strong> Estable
          </Typography>
          <Typography variant="h6">
            <strong>Pasos:</strong> Estable
          </Typography>
          <Typography variant="h6">
            <strong>Ubicación:</strong> Dentro del Rango
          </Typography>
        </Box>
      )}
    </Box>
  );
}
