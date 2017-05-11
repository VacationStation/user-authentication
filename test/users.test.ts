/**
 * Created by christiankalig on 11.05.17.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/users', () => {

    it('responds with JSON array', () => {
        return chai.request(app).get('/api/v1/users')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(1);
            });
    });

    it('should include Max Mustermann', () => {
        return chai.request(app).get('/api/v1/users')
            .then(res => {
                let TestUser = res.body.find(user => user.fullname === 'Max Mustermann');
                expect(TestUser).to.exist;
                expect(TestUser).to.have.all.keys([
                    'id',
                    'firstname',
                    'lastname',
                    'fullname',
                    'email'
                ]);
            });
    });

});