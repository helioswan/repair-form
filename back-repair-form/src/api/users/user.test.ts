import request from "supertest";
import app from "../../app";
import { User, Users } from "./users.model";

beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error) {
    console.error(error);
  }
});

const validUser: User = {
    email: "recrutements@goweb.fr",
    password: "password",
}

const missingUserData = {
    email: "recrutements@goweb.fr",
}

const invalidUser = {
    email: "recrutements@goweb.fr",
    password: "password123",
}

describe('POST /api/v1/register', () => {
    it('responds with success message', async () =>
        request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('User registered successfully');
        }),
    );
    it('responds with a missing data error', (done) => {
        request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(missingUserData)
        .expect('Content-Type', /json/)
        .expect(422, done)
    });
    it('responds with already exist error', async () =>
        request(app)
        .post('/api/v1/register')
        .set('Accept', 'application/json')
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(409)
        .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('User already exists');
        })
    );
});

describe('POST /api/v1/login', () => {
    it('responds with token', async () =>
        request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(validUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty('token');
        }),
    );
    it('responds with a missing data error', (done) => {
        request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(missingUserData)
        .expect('Content-Type', /json/)
        .expect(422, done)
    });
    it('responds with invalid credential', (done) => {
        request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(invalidUser)
        .expect('Content-Type', /json/)
        .expect(401, done)
    });
});