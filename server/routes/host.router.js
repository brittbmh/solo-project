const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get event details for host page
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

router.get('/info/:id', (req, res) => {
    console.log('In /host/info GET');
    const id = req.params.id;
    const queryText = `SELECT "Info_Fields"."description", "Info_Fields"."id" FROM "Event_Info_Fields" 
                        JOIN "Info_Fields" ON "Info_Fields"."id" = "Event_Info_Fields"."info_field_id" 
                        WHERE "event_id" = $1;`;
    pool.query(queryText, [id]).then((result) => {
        console.log(result.rows);

        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});

router.get('/guests/:id', (req, res) => {
    console.log('In /host/guests GET');
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                let queryText = `SELECT "Person"."id" AS "Guest_Id", "Person"."first_name", "Person"."last_name", "Person"."email", "RSVP"."attending", "RSVP"."id" AS "RSVP_Id" 
                                FROM "RSVP" JOIN "Person" ON "RSVP"."guest_id" = "Person"."id" WHERE "event_id" = $1;`;
                const event = req.params.id;

                const firstPull = await client.query(queryText, [event]);
                const RSVP = firstPull.rows;
                console.log('host/guests/req', event);
                for (let item of RSVP) {
                    queryText = `SELECT "Info_Fields"."description", "RSVP_Info_Fields"."id" AS "Info_Id", "RSVP_Info_Fields"."response" FROM "RSVP_Info_Fields" 
                                JOIN "Info_Fields" ON "RSVP_Info_Fields"."info_id" = "Info_Fields"."id" WHERE "rsvp_id" = $1`; ``
                    const secondPull = await client.query(queryText, [item.RSVP_Id]);
                    console.log('secondPull.rows', secondPull.rows);
                    let answer = secondPull.rows;
                    item.responses = answer;
                }
                await client.query('COMMIT');
                res.send({ RSVP });
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

router.put('/edit', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in edit', req.body);
        const newDetails = req.body;
        const queryText = `UPDATE "Events" SET "date" = $1, "location" = $2, "title" = $3, "description" = $4, 
                            "time_start" = $5, "end_time" = $6 WHERE "id" = $7;`;
        pool.query(queryText, [newDetails.date, newDetails.location, newDetails.title, newDetails.description, newDetails.time_start, newDetails.end_time, newDetails.id])
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                res.sendStatus(500);
                console.log(error);
            })
    } else {
        res.sendStatus(403);
    }
})

router.delete('/guest/:rsvpid', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                console.log('in delete', req.params);
                const rsvpid = req.params.rsvpid;
                let queryText = `DELETE FROM "RSVP_Info_Fields" WHERE "rsvp_id" = $1;`;
                await client.query(queryText, [parseInt(rsvpid)])
                queryText = `DELETE FROM "RSVP" WHERE "id" = $1;`;
                await client.query(queryText, [parseInt(rsvpid)])
                await client.query('COMMIT');
                res.sendStatus(200);
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

module.exports = router;