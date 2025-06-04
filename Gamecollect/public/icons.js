// Fonction pour créer un canvas et dessiner l'icône
function createIcon(size, color) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Fond
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Dessin du logo (un simple G stylisé)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 3, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 4, -Math.PI / 2, Math.PI / 2);
  ctx.fill();

  return canvas.toDataURL();
}

// Création des différentes tailles d'icônes
const icons = {
  favicon: createIcon(64, "#2196f3"),
  logo192: createIcon(192, "#2196f3"),
  logo512: createIcon(512, "#2196f3"),
};

// Export des icônes
export default icons;
