const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/types', (req, res) => {
    console.log('In /types GET');
    const queryText = `SELECT * FROM "Party_Types";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});


router.get('/options/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const queryText = `SELECT "Info_Fields".* FROM "Party_Types_Info_Fields" 
                        JOIN "Info_Fields" ON "Party_Types_Info_Fields"."info_field_id" = "Info_Fields"."id" 
                        WHERE "party_type_id" = $1`;
    pool.query(queryText, [id]).then((result) => {
        console.log(result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});


router.post('/new', (req, res) => {
    const party = req.body;
    const partyDetails = req.body.partyDetails;
    const host = req.user.id;
    console.log(req.body);
    const queryText = `INSERT INTO "Events" ("title", "location", "description", "party_type_id", "date", "time_start", "end_time", "host") 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id";`;
    pool.query(queryText, [partyDetails.title, partyDetails.location, partyDetails.description, party.partyType, partyDetails.date, partyDetails.startTime, partyDetails.endTime, host])
    .then((response) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});

module.exports = router;