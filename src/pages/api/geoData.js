import {
  createGeoData,
  getAllGeoData,
  getGeoDataById,
  updateGeoData,
  deleteGeoData,
  getGeoDataByNode,
} from "../../controllers/GeoDataController";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      if (query.node) {
        await getGeoDataByNode(req, res);
      } else if (query.id) {
        await getGeoDataById(req, res);
      } else {
        await getAllGeoData(req, res);
      }
      break;

    case "POST":
      await createGeoData(req, res);
      break;

    case "PUT":
      await updateGeoData(req, res);
      break;

    case "DELETE":
      await deleteGeoData(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
