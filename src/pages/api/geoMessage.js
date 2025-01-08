// src/pages/api/geoMessages.js

import {
  createGeoMessage,
  getAllGeoMessages,
  getGeoMessageById,
  updateGeoMessage,
  deleteGeoMessage,
  getGeoMessageByNode,
} from "../../controllers/GeoMessageController";

// Handle CRUD operations
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        // Fetch single GeoMessage by ID
        return getGeoMessageById(req, res);
      }
      if (req.query.node) {
        // Fetch ALL GeoMessages by Node
        return getGeoMessageByNode(req, res);
      }
      // Fetch all GeoMessages
      return getAllGeoMessages(req, res);
    case "POST":
      // Create new GeoMessage
      return createGeoMessage(req, res);
    case "PUT":
      // Update existing GeoMessage by ID
      return updateGeoMessage(req, res);
    case "DELETE":
      // Delete GeoMessage by ID
      return deleteGeoMessage(req, res);
    default:
      res.status(405).json({ error: "Method Not Allowed" });
  }
}
