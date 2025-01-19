import path from "path";
import { Server } from "socket.io";
require("pg");
import { getMqttClient } from "../../lib/mqttClient";
const db = require("../../../models");
let socketIoInitialized = false;
var counter = 0;
export default async function handler(req, res) {
  if (!socketIoInitialized) {
    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });
    res.socket.server.io = io;
    socketIoInitialized = true;

    const mqttClient = getMqttClient();

    // Forward MQTT messages to WebSocket clients
    mqttClient.on("message", (topic, message) => {
      const payload = manipulateMqttMessage(topic, message);
      io.emit("mqtt-message", { topic, message: payload });
      db.GeoMessage.create({
        node: topic,
        pasos: payload.pasos,
        latitud: payload.lat,
        longitud: payload.long,
        recievedAt: payload.receivedAt,
        temperature: payload.temp,
        // Add other necessary fields here if required
      }).catch((error) => {
        console.error("Error saving message to the database:", error);
      });
    });
  }

  res.end();
}

const manipulateMqttMessage = (topic, message) => {
  try {
    const parsedMessage = JSON.parse(message.toString()); // Parse the message if it's JSON
    console.log(parsedMessage);
    const manipulatedMessage = {
      receivedAt: parsedMessage.received_at,
      id: counter++,
      pasos: parsedMessage.uplink_message.decoded_payload.pasos,
      lat: parsedMessage.uplink_message.decoded_payload.latitud,
      long: parsedMessage.uplink_message.decoded_payload.longitud,
      temp: parsedMessage.uplink_message.decoded_payload.temperatura,
    };

    return manipulatedMessage;
  } catch (error) {
    console.error("Error parsing or manipulating MQTT message:", error);
    return null;
  }
};
