import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Favorite, PlaylistAdd } from "@mui/icons-material";
import { useThemeMode } from "../../contexts/ThemeContext";
import { motion as Motion } from "framer-motion";

const GameCard = ({ game }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode } = useThemeMode();

  // Pour l'instant, nous utiliserons des fonctions factices pour les actions
  const handleAddToWishlist = () => {
    console.log("Ajouter à la wishlist");
  };

  const handleAddToCollection = () => {
    console.log("Ajouter à la collection");
  };

  return (
    <Motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
          backgroundColor:
            mode === "light" ? "background.paper" : "background.default",
          "&:active": {
            transform: isMobile ? "scale(0.98)" : "none",
          },
          borderRadius: { xs: "16px", sm: "8px" },
          overflow: "hidden",
        }}
        elevation={3}
      >
        <Motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <CardMedia
            component="img"
            height={isMobile ? "200" : "140"}
            image={game.image || "https://via.placeholder.com/300x140"}
            alt={game.title}
            sx={{
              objectFit: "cover",
            }}
          />
        </Motion.div>
        <CardContent
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 2 },
            "&:last-child": { pb: 2 },
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
                md: "1.5rem",
              },
              fontWeight: "bold",
              mb: 1.5,
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {game.title}
          </Typography>
          <Box
            sx={{
              mb: { xs: 1.5, sm: 2 },
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Chip
              label={game.platform}
              size={isMobile ? "small" : "medium"}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: "500",
                height: isMobile ? "28px" : "32px",
              }}
            />
            <Chip
              label={game.genre}
              size={isMobile ? "small" : "medium"}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                fontWeight: "500",
                height: isMobile ? "28px" : "32px",
              }}
            />
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {game.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            p: 2,
            pt: 0,
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          <Motion.div whileTap={{ scale: 0.95 }}>
            <Button
              size={isMobile ? "small" : "medium"}
              startIcon={<Favorite />}
              onClick={handleAddToWishlist}
              sx={{
                borderRadius: "20px",
                px: 2,
                py: isMobile ? 0.5 : 1,
                "&:active": {
                  transform: isMobile ? "scale(0.95)" : "none",
                },
              }}
            >
              Wishlist
            </Button>
          </Motion.div>
          <Motion.div whileTap={{ scale: 0.95 }}>
            <Button
              size={isMobile ? "small" : "medium"}
              startIcon={<PlaylistAdd />}
              onClick={handleAddToCollection}
              sx={{
                borderRadius: "20px",
                px: 2,
                py: isMobile ? 0.5 : 1,
                "&:active": {
                  transform: isMobile ? "scale(0.95)" : "none",
                },
              }}
            >
              Collection
            </Button>
          </Motion.div>
        </CardActions>
      </Card>
    </Motion.div>
  );
};

export default GameCard;
