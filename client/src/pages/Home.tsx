import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Auth App
      </Typography>
      {user ? (
        <Button variant="contained" component={Link} to="/dashboard">
          Go to Dashboard
        </Button>
      ) : (
        <>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button variant="outlined" component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Container>
  );
};

export default HomePage;
