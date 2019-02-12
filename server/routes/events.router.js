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
    const queryText = `SELECT "info_field_id" FROM "Party_Types_Info_Fields" WHERE "party_type_id" = $1`;
    pool.query(queryText, [id]).then((result) => {
        console.log(result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;