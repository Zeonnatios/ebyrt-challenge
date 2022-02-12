const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../../server');

describe('Testing endpoint /tasks', () => {

  describe('Testing POST /tasks', () => {
    let response;

    describe('On success', () => {
      it('Return a object with the inserted task', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: "Testes",
          description: "Realizar testes de integração no backend",
          status: "pendente"
        });
  
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('_id');
        expect(response.body).to.have.property('task');
        expect(response.body).to.have.property('description');
        expect(response.body).to.have.property('status');
        expect(response.body).to.have.property('createdDate');
      });
    });

    describe('when there is a failure', () => {

      it('When status field on body is empty', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: "Testes",
          description: "Realizar testes de integração no backend",
          status: ""
        });
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"status\" is not allowed to be empty");
      });

      it('When remove status field on body', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: "Testes",
          description: "Realizar testes de integração no backend"
        });
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"status\" is required");
      });

      it('When description field on body is empty', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: "Testes",
          description: ""
        });
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"description\" is not allowed to be empty");
      });

      it('When remove description field on body', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: "Testes"
        });
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"description\" is required");
      });

      it('When task field on body is empty', async () => {
        response = await chai.request(server).post('/tasks').send({
          task: ""
        });
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"task\" is not allowed to be empty");
      });

      it('When remove status field on body', async () => {
        response = await chai.request(server).post('/tasks').send({});
        expect(response).to.have.status(409);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.equal("\"task\" is required");
      });

    });

  });

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