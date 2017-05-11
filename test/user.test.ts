/**
 * Created by christiankalig on 11.05.17.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

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
                expect(res.body.user.fullname).to.equal("Max Mustermann");
            });
    });

});