// src/controllers/GeoMessageController.js

const db = require("../../models"); // Not destructured

// Create a new GeoMessage
const createGeoMessage = async (req, res) => {
  try {
    const { node, latitud, longitud, recievedAt } = req.body;
    const geoMessage = await db.GeoMessage.create({
      node,
      latitud,
      longitud,
      recievedAt,
    });
    return res.status(201).json(geoMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create GeoMessage" });
  }
};

// Get all GeoMessages
const getAllGeoMessages = async (req, res) => {
  try {
    const geoMessages = await db.GeoMessage.findAll();

    return res.status(200).json(geoMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch GeoMessages" });
  }
};

// Get a single GeoMessage by ID
const getGeoMessageById = async (req, res) => {
  const { id } = req.query;
  try {
    const geoMessage = await db.GeoMessage.findByPk(id);

    if (!geoMessage) {
      return res.status(404).json({ error: "GeoMessage not found" });
    }
    return res.status(200).json(geoMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch GeoMessage" });
  }
};

// Get a single GeoMessage by ID
const getGeoMessageByNode = async (req, res) => {
  const { node } = req.query;
  try {
    const geoMessages = await db.GeoMessage.findAll({
      where: { node: node }, // Find all GeoMessages with the specified node
    });
    if (geoMessages.length === 0) {
      return res.status(404).json({ error: "GeoMessages not found" });
    }
    return res.status(200).json(geoMessages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch GeoMessage" });
  }
};

// Update a GeoMessage by ID
const updateGeoMessage = async (req, res) => {
  const { id } = req.query;
  const { node, latitud, longitud, recievedAt } = req.body;
  try {
    const geoMessage = await db.GeoMessage.findByPk(id);
    if (!geoMessage) {
      return res.status(404).json({ error: "GeoMessage not found" });
    }

    geoMessage.node = node || geoMessage.node;
    geoMessage.latitud = latitud || geoMessage.latitud;
    geoMessage.longitud = longitud || geoMessage.longitud;
    geoMessage.recievedAt = recievedAt || geoMessage.recievedAt;

    await geoMessage.save();
    return res.status(200).json(geoMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update GeoMessage" });
  }
};

// Delete a GeoMessage by ID
const deleteGeoMessage = async (req, res) => {
  const { id } = req.query;
  try {
    const geoMessage = await db.GeoMessage.findByPk(id);
    if (!geoMessage) {
      return res.status(404).json({ error: "GeoMessage not found" });
    }

    await geoMessage.destroy();
    return res.status(204).json({ message: "GeoMessage deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete GeoMessage" });
  }
};

module.exports = {
  createGeoMessage,
  getAllGeoMessages,
  getGeoMessageById,
  updateGeoMessage,
  deleteGeoMessage,
  getGeoMessageByNode,
};
