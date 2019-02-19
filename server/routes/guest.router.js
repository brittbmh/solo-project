const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/name', (req, res) => {
    const queryText = `SELECT "first_name", "last_name" FROM "Person" WHERE "id" = $1; `
    const guest = req.user.id;
    pool.query(queryText, [guest]).then((result) => {
        console.log(result.rows);

        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
})

router.put('/', (req, res) => {
    const queryText = `UPDATE "RSVP" SET "attending" = $1 WHERE "event_id" = $2 AND "guest_id" = $3 RETURNING "id";`;
    const guest = req.user.id;
    const eventId = req.body.eventId;
    const response = req.body.response;
    const values = [response.attending, eventId, guest];
    pool.query(queryText, values).then((response) => {
        res.send({rsvp_id: response.rows[0].id});
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
})

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            console.log('in /guest post');
            const client = await pool.connect();
            try {
                console.log('in guest POST', req.body);
                const RSVPId = req.body.rsvp_id;
                const response = req.body.response;
                for (let answer of response) {
                    queryText = `INSERT INTO "RSVP_Info_Fields" ("rsvp_id", "info_id", "response") VALUES ($1, $2, $3);`;
                    await client.query(queryText, [RSVPId, parseInt(answer.id), answer.reply]);
                }
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (error) {
                console.log('Rollback', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;