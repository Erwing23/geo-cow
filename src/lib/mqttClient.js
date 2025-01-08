import mqtt from "mqtt";

// Singleton MQTT Client
let mqttClient;

export const getMqttClient = () => {
  if (!mqttClient) {
    mqttClient = mqtt.connect("mqtt://nam1.cloud.thethings.network:1883", {
      username: "startlabs-vaquita@ttn@ttn",
      password: process.env.TTN_ACCESS_KEY,
      reconnectPeriod: 5000, // Reconnect every 5 seconds
      connectTimeout: 10 * 1000, // Timeout after 10 seconds
      keepalive: 60, // Send a keepalive ping every 60 seconds
    });

    mqttClient.on("connect", () => {
      console.log("Connected to TTN MQTT broker");
      const topic = "v3/startlabs-vaquita@ttn/devices/+/up";
      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error("Error al suscribirse:", err);
        } else {
          console.log(`Suscrito al tema: ${topic}`);
        }
      });
    });

    mqttClient.on("error", (error) => {
      console.error("MQTT Connection Error:", error);
    });

    mqttClient.on("close", () => {
      console.log("MQTT Connection Closed");
    });
    // Graceful shutdown
    process.on("SIGINT", () => {
      mqttClient.end(() => {
        console.log("MQTT Connection Ended");
        process.exit(0);
      });
    });
  }

  return mqttClient;
};
