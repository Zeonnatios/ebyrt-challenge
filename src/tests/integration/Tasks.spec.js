const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../../server');

describe('Testing endpoint /tasks', () => {

  describe('Testing GET /tasks', () => {
    let response;

    beforeEach(async () => {
		  response = await chai.request(server).get('/tasks');
		});

    it('Return status code "200"', () => {
      expect(response).to.have.status(200);
    });

    it('Return a array in body', () => {
      expect(response.body).to.be.an('array');
    });

    it('Return a array of tasks', () => {
      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('task');
      expect(response.body[0]).to.have.property('description');
      expect(response.body[0]).to.have.property('status');
      expect(response.body[0]).to.have.property('createdDate');
    });

  });
});