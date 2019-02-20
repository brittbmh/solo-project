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

router.get('/name/:id', (req, res) => {
    console.log('in GET name');

    const id = parseInt(req.params.id);
    const queryText = `SELECT "title" FROM "Events" WHERE "id" = $1;`;
    pool.query(queryText, [id]).then((result) => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
})


router.get('/options/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const queryText = `SELECT "Info_Fields".* FROM "Party_Types_Info_Fields" 
                        JOIN "Info_Fields" ON "Party_Types_Info_Fields"."info_field_id" = "Info_Fields"."id" 
                        WHERE "party_type_id" = $1;`;
    pool.query(queryText, [id]).then((result) => {
        console.log(result.rows);

        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
});

router.get('/user/:email', (req, res) => {
    console.log('in user get', req.params);
    const queryText = `SELECT "id" FROM "Person" WHERE "email" = $1;`;
    pool.query(queryText, [req.params.email]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        res.sendStatus(500);
        console.log(error);
    })
})

router.post('/guests', (req, res) => {
    
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                const eventId = req.body.eventId;
                const guestList = req.body.guestList;
                
                
                for (guest of guestList){
                    let queryText = `INSERT INTO "RSVP" ("guest_id", "event_id") VALUES ($1, $2);`;
                    pool.query(queryText, [guest.id, eventId])
                }
                await client.query('COMMIT');
                console.log('end of post guests');
                res.sendStatus(201);
            } catch (error) {
                console.log('Rollback', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
    })().catch((error) => {
        res.sendStatus(500);
        console.log(error);
    });
    } else {
        res.sendStatus(403);
    }
})


router.post('/new', (req, res) => {
    console.log('In event/new POST');
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "Events" ("title", "location", "description", "party_type_id", "date", "time_start", "end_time", "host") 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id";`;
                const host = req.user.id;
                const party = req.body;
                
                
                const partyDetails = req.body.partyDetails;
                console.log(partyDetails);
                const values = [partyDetails.title, partyDetails.location, partyDetails.description, parseInt(party.partyType), partyDetails.date, partyDetails.startTime, partyDetails.endTime, host];

                const eventResult = await client.query(queryText, values);
                const eventId = eventResult.rows[0].id;

                const partyOptions = req.body.partyOptions;
                for (let option of partyOptions) {
                    queryText = `INSERT INTO "Event_Info_Fields" ("event_id", "info_field_id") VALUES ($1, $2);`;
                    await client.query(queryText, [eventId, option]);
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