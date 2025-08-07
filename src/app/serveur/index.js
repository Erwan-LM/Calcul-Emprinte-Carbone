const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    db.serialize(() => {
        db.run(`CREATE TABLE if not exists users (id NUMBER , empreinteCarbone NUMBER)`, (err, row) => {
           if (err) {
               console.error(err.message);
           }
        });
     });
    console.log('Connected to the SQlite database.'); 
});

app.get('/calculerTrajetVoiture', (req, res) => {
    const consommation = Number(req.query.consommationPour100Km);
    const typeCarburant = req.query.typeCarburant;
    const distanceKm = Number(req.query.distanceKm);

    if (!consommation || !typeCarburant || !distanceKm || !['diesel', 'essence'].includes(typeCarburant)) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = typeCarburant === 'diesel' ? 2.7 : 2.4;
    const empreinteCarbone = (consommation / 100) * distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/calculerTrajetAvion', (req, res) => {
    const distanceKm = Number(req.query.distanceKm);

    if (!distanceKm) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = 115; // Par km parcouru
    const empreinteCarbone = distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/calculerTrajetTrain', (req, res) => {
    const distanceKm = Number(req.query.distanceKm);
    const typeCarburant = req.query.typeCarburant;

    if (!distanceKm || !typeCarburant || !['electricite', 'diesel'].includes(typeCarburant)) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = typeCarburant === 'electricite' ? 0.045 : 1.5;
    const empreinteCarbone = distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/monEmpreinteCarbone', (req, res) => {
    const idUtilisateur = Number(req.query.idUtilisateur);

    if (!idUtilisateur) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.get(`SELECT empreinteCarbone FROM users WHERE id = ?`, [idUtilisateur], (err, row) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de l'obtention de l'empreinte carbone");
          }
          return res.send(row);
       });
    });
});

app.put('/ajouterEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;
    const empreinteCarbone = req.body.empreinteCarbone;

    if (!idUtilisateur || !empreinteCarbone) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = empreinteCarbone + ? WHERE id = ?`, [empreinteCarbone, idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Error updating carbon footprint");
          }
          return res.send("Success");
       });
    });
});

app.put('/retirerEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;
    const empreinteCarbone = req.body.empreinteCarbone;

    if (!idUtilisateur || !empreinteCarbone) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = MAX(empreinteCarbone - ?, 0) WHERE id = ?`, [empreinteCarbone, idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de la mise à jour de l'empreinte carbone");
          }
          return res.send("Success");
       });
    });
});

app.post('/supprimerEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;

    if (!idUtilisateur) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = 0 WHERE id = ?`, [idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de la suppression de l'empreinte carbone");
          }
          return res.send("Success");
       });
    });
});

const server = app.listen(8080, () => {
    console.log('Listening on port 8080...');
});