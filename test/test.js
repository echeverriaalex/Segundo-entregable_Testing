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

beforeEach(() => {
    db.sequelize.truncate({ cascade: true })
});

after(() => {
    server.close();
})

describe.only('GET /users', ()=>{
    it('Get all users and check status 200', (done)=>{
        request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
	});
    
    it("check theres only one user", done => {
        request(app)
        .post('/user')
        .send({
            "firstname": "Alex",
            "lastname": "Echeverria",
            "username": "Alexiñho",
            "email": "alex@echeverria.com",
            "password": "contraseñadealex"
        })
        .set('Accept', 'application/json')
        .then(user => {
            request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                assert.lengthOf(res.body, 1);
                done();
            })
        }).catch(err => done());
    })
});

describe.only("POST /user", () => {
    it("Create an user and check status 201", done => {
        request(app)
        .post('/user')
        .send({
            "firstname": "Alex",
            "lastname": "Echeverria",
            "username": "Alexiñho",
            "email": "alex@echeverria.com",
            "password": "contraseñadealex"
        })
        .set('Accept', 'application/json')
        .expect(201)
        .end(done);
    })
});


describe.only("GET /cars", () => {
    beforeEach(async () => {
        let user = db.User.build({
            "id": 3,
            "firstname": "Alex",
            "lastname": "Echeverria",
            "username": "Alexiñho",
            "email": "alex@echeverria.com",
            "password": "contraseñadealex",
            "role": "user"
        })
        await user.save();
        await db.car.create({
            "brand": "Mitsubishi",
            "model": "Evo 9",
            "year": 2008,
            "color": "black",
            "UserId": user.id
        });
    })

    it("will test cars", done => {
        request(app)
        .get('/cars')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
            assert.lengthOf(res.body, 1);
            done();
        });
    })
})