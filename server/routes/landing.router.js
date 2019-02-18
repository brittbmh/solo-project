const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('In landing router');
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const guest = req.user.id;
                let queryText = `SELECT "event_id", "attending" FROM "RSVP" WHERE "guest_id" = $1;`;
                const eventList = await client.query(queryText, [guest]);
                const events = eventList.rows;
                console.log(events);
                let answer = [];
                for (let event of events) {
                    queryText = `SELECT "Events"."title", "Events"."id" AS "event_id", "Events"."date", "Person"."first_name", "Person"."last_name" 
                                FROM "Events" JOIN "Person" ON "Events"."host" = "Person"."id" WHERE "Events"."id" = $1;`
                    const secondPull = await client.query(queryText, [event.event_id]);
                    let result = secondPull.rows[0];
                    console.log(result);
                    result.attending = event.attending;
                    answer.push(result);  
                }
                await client.query('COMMIT');
                res.send(answer);
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

router.get('/host', (req, res) => {
    console.log('In /host GET');
    const host = req.user.id;
    const queryText = `SELECT "title", "date", "id" FROM "Events" WHERE "host" = $1;`;
    pool.query(queryText, [host]).then((result) => {
        console.log(result.rows);
        
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});



module.exports = router;