import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = {
  favicon: 64,
  logo192: 192,
  logo512: 512,
};

// Création d'un SVG simple pour l'icône
function createSVG(size) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 3}" fill="#2196f3"/>
  <path d="M ${size / 2} ${size / 2} L ${size / 2} ${size * 0.25} A ${
    size / 4
  } ${size / 4} 0 0 1 ${size / 2} ${size * 0.75} Z" fill="#ffffff"/>
</svg>`;
}

const publicDir = path.join(__dirname, "../public");

// Crée le dossier public s'il n'existe pas
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Génère les icônes
Object.entries(sizes).forEach(([name, size]) => {
  const svg = createSVG(size);
  fs.writeFileSync(path.join(publicDir, `${name}.svg`), svg);
});

// Copie le même fichier pour favicon.ico (les navigateurs modernes acceptent le SVG)
fs.copyFileSync(
  path.join(publicDir, "favicon.svg"),
  path.join(publicDir, "favicon.ico")
);
