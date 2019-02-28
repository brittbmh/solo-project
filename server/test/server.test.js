const app = require('../server');
const testServer = require('supertest');

test('it should return info from the database', () => {
    return testServer(app).get('')
})
