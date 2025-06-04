import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import GameCard from "../components/GameCard/GameCard";
import PullToRefresh from "../components/PullToRefresh/PullToRefresh";

const Games = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [platform, setPlatform] = useState("all");
  const [genre, setGenre] = useState("all");

  // Données temporaires pour les jeux
  const tempGames = [
    {
      id: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      platform: "Nintendo Switch",
      genre: "Action-RPG",
      description:
        "Une aventure épique dans un monde ouvert vaste et mystérieux.",
      image: "https://via.placeholder.com/300x140",
    },
    {
      id: 2,
      title: "God of War Ragnarök",
      platform: "PS5",
      genre: "Action-Aventure",
      description: "Kratos et Atreus s'aventurent dans les neuf royaumes.",
      image: "https://via.placeholder.com/300x140",
    },
    {
      id: 3,
      title: "Elden Ring",
      platform: "PC",
      genre: "Action-RPG",
      description: "Un monde ouvert rempli de dangers et de mystères.",
      image: "https://via.placeholder.com/300x140",
    },
  ];

  // Filtrer les jeux en fonction des critères
  const filteredGames = tempGames.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlatform = platform === "all" || game.platform === platform;
    const matchesGenre = genre === "all" || game.genre === genre;
    return matchesSearch && matchesPlatform && matchesGenre;
  });

  const handleRefresh = async () => {
    // Simulation d'un chargement
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSnackbarOpen(true);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"}
        component="h1"
        gutterBottom
        sx={{
          fontSize: {
            xs: "1.75rem",
            sm: "2.25rem",
            md: "3rem",
          },
          fontWeight: "bold",
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        Catalogue de Jeux
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: { xs: 3, sm: 4 },
          backgroundColor: "background.paper",
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              fullWidth
              label="Rechercher un jeu"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Plateforme</InputLabel>
              <Select
                value={platform}
                label="Plateforme"
                onChange={(e) => setPlatform(e.target.value)}
              >
                <MenuItem value="all">Toutes les plateformes</MenuItem>
                <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
                <MenuItem value="PS5">PS5</MenuItem>
                <MenuItem value="PC">PC</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={genre}
                label="Genre"
                onChange={(e) => setGenre(e.target.value)}
              >
                <MenuItem value="all">Tous les genres</MenuItem>
                <MenuItem value="Action-RPG">Action-RPG</MenuItem>
                <MenuItem value="Action-Aventure">Action-Aventure</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <PullToRefresh onRefresh={handleRefresh}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            mt: { xs: 1, sm: 2 },
          }}
        >
          {filteredGames.map((game) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={game.id}
              sx={{
                display: "flex",
              }}
            >
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      </PullToRefresh>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Liste des jeux mise à jour !
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Games;
