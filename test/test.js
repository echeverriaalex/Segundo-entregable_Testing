const {app, server} = require('../app');
const request = require('supertest');
const {assert} = require('chai');
const db = require('../models/index');


/*
const sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
*/

describe.only('GET /users', ()=>{

    it('check status 200', (done)=>{
        request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
	});
});