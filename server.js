const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON envoyé par le client
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS) dans le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Route pour recevoir les données du formulaire
app.post('/contact', (req, res) => {
  const message = req.body;

  if (!message.nom || !message.email || !message.message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Lire le fichier messages.json
  const filePath = path.join(__dirname, 'messages.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur serveur.' });
    }

    let messages = [];
    try {
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    messages.push(message);

    // Écrire dans messages.json
    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur serveur.' });
      }

      res.json({ message: 'Message reçu avec succès !' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
