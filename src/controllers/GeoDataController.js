const db = require("../../models"); // Not destructured

// Create a new GeoData record
const createGeoData = async (req, res) => {
  const { name, geom } = req.body;
  try {
    const newGeoData = await db.GeoData.create({ name, geom });
    res.status(201).json(newGeoData);
  } catch (error) {
    console.error("Error creating GeoData:", error);
    res.status(500).json({ error: "Failed to create GeoData." });
  }
};

// Get all GeoData records
const getAllGeoData = async (req, res) => {
  try {
    const geoData = await db.GeoData.findAll();
    res.status(200).json(geoData);
  } catch (error) {
    console.error("Error fetching GeoData:", error);
    res.status(500).json({ error: "Failed to fetch GeoData." });
  }
};

// Get a single GeoData record by ID
const getGeoDataById = async (req, res) => {
  const { id } = req.query;
  try {
    const geoData = await db.GeoData.findByPk(id);
    if (!geoData) {
      return res.status(404).json({ error: "GeoData not found." });
    }
    res.status(200).json(geoData);
  } catch (error) {
    console.error("Error fetching GeoData:", error);
    res.status(500).json({ error: "Failed to fetch GeoData." });
  }
};

// Update a GeoData record
const updateGeoData = async (req, res) => {
  const { id } = req.params;
  const { name, geom } = req.body;
  try {
    const geoData = await db.GeoData.findByPk(id);
    if (!geoData) {
      return res.status(404).json({ error: "GeoData not found." });
    }
    geoData.name = name || geoData.name;
    geoData.geom = geom || geoData.geom;
    await geoData.save();
    res.status(200).json(geoData);
  } catch (error) {
    console.error("Error updating GeoData:", error);
    res.status(500).json({ error: "Failed to update GeoData." });
  }
};

// Delete a GeoData record
const deleteGeoData = async (req, res) => {
  const { id } = req.params;
  try {
    const geoData = await db.GeoData.findByPk(id);
    if (!geoData) {
      return res.status(404).json({ error: "GeoData not found." });
    }
    await geoData.destroy();
    res.status(200).json({ message: "GeoData deleted successfully." });
  } catch (error) {
    console.error("Error deleting GeoData:", error);
    res.status(500).json({ error: "Failed to delete GeoData." });
  }
};

// Get GeoData by specific node or criteria
const getGeoDataByNode = async (req, res) => {
  const { node } = req.query; // Assuming `node` is passed as a query parameter
  try {
    const geoData = await db.GeoData.findAll({
      where: { node },
    });
    res.status(200).json(geoData);
  } catch (error) {
    console.error("Error fetching GeoData by node:", error);
    res.status(500).json({ error: "Failed to fetch GeoData by node." });
  }
};

// Export all controller functions
module.exports = {
  createGeoData,
  getAllGeoData,
  getGeoDataById,
  updateGeoData,
  deleteGeoData,
  getGeoDataByNode,
};
