// generate-sitemap.js
const SitemapGenerator = require('sitemap-generator');
const path = require('path');

const destPath = path.resolve(__dirname, 'dist'); // Choisir le chemin de sortie de votre choix

const generator = new SitemapGenerator('https://example.com', {
    filepath: path.join(destPath, 'sitemap.xml'), // Spécifiez le chemin de sortie ici
    stripQuerystring: false,
});

generator.on('done', () => {
    console.log('Sitemap généré avec succès');
});

generator.start();
