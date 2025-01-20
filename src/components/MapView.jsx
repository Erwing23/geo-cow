import { useCallback, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  AdvancedMarkerElement,
  Marker,
} from "@react-google-maps/api";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import axios from "../lib/axios";
import * as turf from "@turf/turf";

import ChartFooter from "./ChartFooter";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -2.09896, // Latitud
  lng: -79.92667, // Longitud
};
var geoJson = {};

const isPointInsideGeoJson = (lat, lng) => {
  if (!geoJson || !geoJson.features || geoJson.features.length === 0)
    return false;

  // Create a Point using Turf.js
  const point = turf.point([lng, lat]);
  const polygon = turf.polygon(geoJson.features[0].geometry.coordinates);

  // Check if the point is inside the polygon or multi-polygon in the GeoJSON
  return turf.booleanPointInPolygon(point, polygon);
};
export default function MapView({ messages, geoMessages, geoMessagesByNode }) {
  // Map options to disable default UI elements
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false, // Disables all default UI
    }),
    []
  );
  const onMapLoad = useCallback((map) => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/geoData", {
          params: { id: 3 },
        });
        geoJson = response.data.geom;
        map.data.addGeoJson(geoJson);
      } catch (error) {
        console.log("Failed to fetch GeoData :", error);
      }
    };
    fetchData();

    // Optional: Customize GeoJSON styling
    map.data.setStyle({
      fillColor: "blue",
      strokeColor: "blue",
      strokeWeight: 2,
    });

    // Add a click listener to GeoJSON features
    map.data.addListener("click", (event) => {
      const feature = event.feature;
      const name = feature.getProperty("name");
      console.log(`Clicked on: ${event}`);
    });
  }, []);

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
          onLoad={onMapLoad}
        >
          {geoMessagesByNode.map((marker) => {
            const isInside = isPointInsideGeoJson(
              marker.latitud,
              marker.longitud
            );

            const iconUrl = isInside
              ? "/cow-inside.png" // Icon for points inside GeoJSON
              : "/cow-outside.png"; // Icon for points outside GeoJSON
            console.log(iconUrl);

            return (
              <Marker
                key={marker.id}
                icon={iconUrl}
                position={{
                  lat: marker.latitud,
                  lng: marker.longitud,
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
      <ChartFooter geoMessagesByNode={geoMessagesByNode} />
    </Box>
  );
}
