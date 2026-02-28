const express = require('express');
const router = express.Router();
const db = require('../config/db');

//  Page Accueil
router.get('/', (req, res) => {
    const { search, statut, priorite } = req.query;
    let sql = "SELECT * FROM tache WHERE 1=1";
    let params = [];

    if (search) {
        sql += " AND titre LIKE ?";
        params.push('%' + search + '%');
    }
    if (statut) {
        sql += " AND statut = ?";
        params.push(statut);
    }
    if (priorite) {
        sql += " AND priorite = ?";
        params.push(priorite);
    }

    db.query(sql, params, (error, results) => {
        if (error) {
            return res.send("Erreur base de données");
        }
        res.render('index', { taches: results });
    });
});

//  Page Ajout
router.get('/ajout', (req, res) => {
    res.render('ajout');
});

//  Page Dashboard  Statistiques
router.get('/dashboard', (req, res) => {
    db.query("SELECT * FROM tache", (error, results) => {
        if (error) {
            return res.send("Erreur base de données");
        }
        res.render('dashboard', { taches: results });
    });
});

//  Ajouter une tâche
router.post('/add', (req, res) => {
    const { titre, description, priorite, statut, date_limite, responsable } = req.body;
    const date_creation = new Date();
    const sql = `INSERT INTO tache (titre, description, priorite, statut, date_creation, date_limite, responsable) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [titre, description, priorite, statut, date_creation, date_limite, responsable], (error, result) => {
        if (error) {
            return res.send("Erreur insertion : " + error.message);
        }
        res.redirect('/');
    });
});

// Afficher le formulaire de modification
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM tache WHERE id = ?", [id], (error, results) => {
        if (error) {
            return res.send("Erreur : " + error.message);
        }
        res.render('edit', { tache: results[0] });
    });
});

//  Modifier une tâche
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { titre, description, priorite, statut, date_limite, responsable } = req.body;
    const sql = `UPDATE tache SET titre=?, description=?, priorite=?, statut=?, date_limite=?, responsable=? WHERE id=?`;
    db.query(sql, [titre, description, priorite, statut, date_limite, responsable, id], (error, result) => {
        if (error) {
            return res.send("Erreur modification : " + error.message);
        }
        res.redirect('/');
    });
});

// Supprimer une tâche
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM tache WHERE id = ?", [id], (error, result) => {
        if (error) {
            return res.send("Erreur suppression : " + error.message);
        }
        res.redirect('/');
    });
});

module.exports = router;