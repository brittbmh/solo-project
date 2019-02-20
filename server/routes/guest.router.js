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

router.get('/:id', (req,res) => {
    if (req.isAuthenticated()) {
        (async () => {
            console.log('in /guest GET');
            const client = await pool.connect();
            try {
                console.log('in guest GET', req.params);
                const guest = req.user.id;
                const id = req.params.id;
                let queryText = `SELECT "RSVP"."attending", "RSVP"."id" AS "rsvp_id"  
                                    FROM "RSVP" WHERE "RSVP"."event_id" = $1 AND "RSVP"."guest_id" = $2;`
                const RSVPPull = await client.query(queryText, [parseInt(id), guest]);
                queryText = `SELECT "info_id" AS "id", "response" AS "reply" FROM "RSVP_Info_Fields" WHERE "rsvp_id" = $1;`;
                const RSVP = RSVPPull.rows[0];
                const RSVPId = RSVP.rsvp_id;
                const responsePull = await client.query(queryText, [RSVPId])
                RSVP.response = responsePull.rows;
                console.log(RSVP);
                await client.query('COMMIT');
                res.send(RSVP);
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
})

router.put('/', (req, res) => {
    console.log('In guest put', req.body);
    
    const queryText = `UPDATE "RSVP" SET "attending" = $1 WHERE "event_id" = $2 AND "guest_id" = $3 RETURNING "id";`;
    const guest = req.user.id;
    const eventId = req.body.eventId;
    const attending = req.body.attending;
    const values = [attending, eventId, guest];
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