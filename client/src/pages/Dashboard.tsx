import { Container, Box, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email: {user?.email}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={logout}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
