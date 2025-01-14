import { useCallback, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  AdvancedMarkerElement,
  Marker,
} from "@react-google-maps/api";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

import ChartFooter from "./ChartFooter";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -2.09896, // Latitud
  lng: -79.92667, // Longitud
};

export default function MapView({ messages, geoMessages, geoMessagesByNode }) {
  // Map options to disable default UI elements
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false, // Disables all default UI
    }),
    []
  );

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full viewport height
      }}
    >
      <LoadScript googleMapsApiKey="AIzaSyB3X-boDL-w3wpD_2hdXpk3wvWrwXTZzH0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={mapOptions}
        >
          {geoMessagesByNode.map((marker) => (
            <Marker
              key={marker.id}
              position={{
                lat: marker.latitud,
                lng: marker.longitud,
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <ChartFooter geoMessagesByNode={geoMessagesByNode} />
    </Box>
  );
}
