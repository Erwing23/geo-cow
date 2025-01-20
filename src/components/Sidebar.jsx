// Sidebar.jsx
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  colors,
  Image,
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
          <Card
            key={coord.id}
            sx={{ margin: "10px", boxShadow: 5, borderRadius: 5 }}
          >
            <CardContent>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/cow-inside.png"
                    alt="Description"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyItems="center"
                  alignItems="center"
                  flexGrow={3}
                >
                  <Box justifyContent="center" marginBottom="15px">
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      Vaquita {coord.id}
                    </Typography>
                  </Box>
                  <Box>
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
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
