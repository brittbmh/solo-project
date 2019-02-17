const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            console.log('in /guest post');
            
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "RSVP" ("guest_id", "event_id", "attending") 
                        VALUES ($1, $2, $3) RETURNING "id";`;
                const guest = req.user.id;
                const eventId = req.body.eventId;
                const response = req.body.response;
                const values = [ guest, eventId, response.attending];

                const result = await client.query(queryText, values);
                const RSVPId = result.rows[0].id;
                console.log(RSVPId);
                

                for (let answer of response) {
                    queryText = `INSERT INTO "RSVP_Info_Fields" ("rsvp_id", "info_id", "response") VALUES ($1, $2, $3);`;
                    await client.query(queryText, [RSVPId, parseInt(answer.id), answer.reply]);
                }
                await client.query('COMMIT');
                res.send({ eventId });
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