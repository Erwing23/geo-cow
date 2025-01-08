import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import styles from "../styles/Home.module.css";
import { io } from "socket.io-client";
import axios from "../lib/axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [mqttMessages, setMessages] = useState([]);
  const [geoMessages, setGeoMessages] = useState([]);
  const [geoMessagesByNode, setgeoMessagesByNode] = useState([]);
  const [targetNode, setargetNode] = useState("");

  useEffect(() => {
    // Call the API route to initialize the Socket.IO server
    fetch("/api/socket")
      .then((response) => {
        if (response.ok) {
          console.log("Socket.IO server initialized");
        } else {
          console.error("Failed to initialize Socket.IO server");
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const socket = io({
      path: "/api/socket",
      transports: ["websocket"], // Only use WebSocket
      reconnection: true, // Enable reconnections
      reconnectionAttempts: 5, // Limit reconnection attempts
      reconnectionDelay: 1000, // Delay between attempts (in ms)
      timeout: 5000, // Connection timeout (in ms)
    });

    // Listen for incoming messages from the MQTT broker
    socket.on("mqtt-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Fetch all GeoMessages on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get("/geoMessage");
        setGeoMessages(response.data); // Set state with fetched data
      } catch (error) {
        console.error("Failed to fetch GeoMessages FE:", error);
      }
    };
    fetchData();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/geoMessage", {
          params: { node: targetNode },
        });
        setgeoMessagesByNode(response.data); // Set state with fetched data
        console.log(response.data); // Set state with fetched data
      } catch (error) {
        console.log("Failed to fetch GeoMessages FE2:", error);
      }
    };
    if (targetNode) {
      fetchData();
    }

    console.log("Updated MQTT Messages:", targetNode);
    console.log("Updated MQTT Messages:", geoMessagesByNode);
  }, [targetNode]); // Only runs when mqttMessages changes
  return (
    <div className={styles.container}>
      <Sidebar
        coordinates={mqttMessages}
        geoMessages={geoMessages}
        setargetNode={setargetNode}
      />
      <MapView
        messages={mqttMessages}
        geoMessages={geoMessages}
        geoMessagesByNode={geoMessagesByNode}
      />
    </div>
  );
}
