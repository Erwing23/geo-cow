// Sidebar.jsx
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  colors,
} from "@mui/material";

export default function Sidebar({ coordinates, geoMessages, setargetNode }) {
  // Filter messages to ensure unique nodes
  const uniqueMessages = geoMessages.filter(
    (item, index, self) =>
      index === self.findIndex((msg) => msg.node === item.node)
  );

  return (
    <>
      <div>
        {uniqueMessages.map((coord) => (
          <Card key={coord.id}>
            <CardContent>
              <Box display="flex" justifyContent="center" marginBottom="15px">
                <Typography variant="h6" style={{ textAlign: "center" }}>
                  Vaquita {coord.id}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={1}>
                <Chip
                  clickable
                  label={`${coord.node.slice(-10)}`}
                  color="primary"
                  style={{ margin: "5px 0" }}
                  onClick={() => {
                    setargetNode(coord.node);
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
