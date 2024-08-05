import { Repair, Repairs } from "./repairs.model";
import request from "supertest";
import app from "../../app";
import { User, Users } from "../users/users.model";

let token: string;

beforeAll(async () => {
  try {
    const validUser: User = {
      email: "recrutements@goweb.fr",
      password: "password",
    }
    await Users.drop();
    await Repairs.drop();
    await request(app).post('/api/v1/register').send(validUser)
    const response = await request(app).post('/api/v1/login').set('Accept', 'application/json').send(validUser)
    if (response.body.token) {
      token = response.body.token;
    }
  } catch (error) {
    console.error(error);
  }
});

let id: string;
const invalidId: string = "dqsADZEAZDQSDSDSQDSDQS"
const emptyId: string = "66a25131e471a8775c41318d"

const validRepair: Repair = {
  firstname: "Go",
  lastname: "Web",
  address: "36 Rue du Maréchal Foch",
  zip: "59100",
  email: "recrutements@goweb.fr",
  phone: "0355661100",
  paymentOption: "Payer en ligne",
  generalTerms: true,
  retractTerms: true,
  commercialOffer: false,
  detail: "WC simple",
  location: "WC",
  reason: "Engorgement (WC bouchés)",
  type: "plomberie"
}

const missingRepairData = {
  firstname: "Go",
  lastname: "Web",
  address: "36 Rue du Maréchal Foch",
  paymentOption: "Payer en ligne",
  generalTerms: true,
}

describe('GET /api/v1/repairs', () => {
  it('responds with an empty array of repairs', async () => {
    return request(app)
      .get('/api/v1/repairs')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      })
  });
});

describe('POST /api/v1/repairs', () => {
  it('responds with the inserted object', async () =>
    request(app)
      .post('/api/v1/repairs')
      .set('Accept', 'application/json')
      .send(validRepair)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toMatchObject(validRepair);
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
      })
  );

  it('responds with a missing data error', async () =>
    request(app)
      .post('/api/v1/repairs')
      .set('Accept', 'application/json')
      .send(missingRepairData)
      .expect('Content-Type', /json/)
      .expect(422)
  );
});

describe('GET /api/v1/repairs/:id', () => {
  it('responds with the repair object', async () => {
    return request(app)
      .get(`/api/v1/repairs/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject(validRepair);
      });
  })
  it('responds with a not found error', (done) => {
    request(app)
    .get(`/api/v1/repairs/${emptyId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(404, done);
  });
  it('responds with invalid id', (done) => {
    request(app)
    .get(`/api/v1/repairs/${invalidId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(422, done);
  });
});

describe('PUT /api/v1/repairs/:id', () => {
  it('responds with the updated object', async () => {
    return request(app)
      .put(`/api/v1/repairs/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...validRepair, firstname: "GoWeb1" })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({ ...validRepair, firstname: "GoWeb1", _id: id });
      });
  });
  it('responds with a not found error', (done) => {
    request(app)
    .put(`/api/v1/repairs/${emptyId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({ ...validRepair, firstname: "GoWeb" })
    .expect('Content-Type', /json/)
    .expect(404, done);
  })
  it('responds with a missing data error', (done) => {
    request(app)
    .put(`/api/v1/repairs/${emptyId}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send(missingRepairData)
    .expect('Content-Type', /json/)
    .expect(422, done);
  })
});