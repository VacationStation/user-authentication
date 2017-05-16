/**
 * Created by christiankalig on 11.05.17.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST api/v1/users', () => {
    it('responds with single JSON Object', () => {
        return chai.request(app).post('/api/v1/users')
            .send({user: {firstName: 'Max', lastName: 'Mustermann', email: 'test@test.de'}})
            .then(res => {
                // expect(res).to.be.json;
                // expect(res.status).to.equal(200);
                expect(res.body.message).to.exist;
            });
    });
});

describe('GET api/v1/users', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/users')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.users).to.be.an('array');
                expect(res.body.users).to.have.length(1);
            });
    });

    it('should include Max Mustermann', () => {
        return chai.request(app).get('/api/v1/users')
            .then(res => {
                let TestUser = res.body.users.find(user => user.fullName === 'Max Mustermann');
                expect(TestUser).to.exist;
                expect(TestUser).to.have.all.keys([
                    'id',
                    'firstName',
                    'lastName',
                    'email',
                    'password',
                    'isActive',
                    'isAdmin',
                    'createdAt',
                    'updatedAt',
                    'fullName' // virtual field
                ]);
            });
    });

});

describe('GET api/v1/users/:id', () => {

    it('responds with single JSON Object', () => {
        return chai.request(app).get('/api/v1/users/1')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
            });
    });

    it('should return Max Mustermann', () => {
        return chai.request(app).get('/api/v1/users/1')
            .then(res => {
                expect(res.body.user.fullName).to.equal("Max Mustermann");
            });
    });

});

describe('PATCH api/v1/users/:id', () => {
    it('responds with single JSON Object', () => {
        return chai.request(app).patch('/api/v1/users/1')
            .send({user: {id: 1, firstName: 'Maxi', lastName: 'Musterfrau'}})
            .then(res => {
                // expect(res).to.be.json;
                // expect(res.status).to.equal(200);
                expect(res.body.message).to.exist;
            });
    });
});