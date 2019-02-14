const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    console.log('In /host GET');
    const id = req.params.id;
    const queryText = `SELECT * FROM "Events" WHERE "id" = $1;`;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});




module.exports = router;