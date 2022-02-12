const sinon = require('sinon');
const { expect } = require('chai');
const { insertTaskMock, updateTaskMock } = require('../../mocks/tasks');
const TasksServices = require('../../../services/TasksServices');
const TasksController = require('../../../controllers/TasksController');

describe('Test TasksController', () => {

  describe('Call createNewTask Controller', () => {
    describe('Should return a object', () => {
      const _id = '604cb554311d68f491ba5781';
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {
          task: 'Testes',
          description: 'Realizar testes unitários no backend',
          status: 'pendente',
          createdDate: 1644605373207,
        };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves({_id, ...insertTaskMock});

        sinon.stub(TasksServices, 'createNewTask').resolves({_id, ...insertTaskMock});
      });

      after(() => {
        TasksServices.createNewTask.restore();
      });

      it('Should call with status 201', async () => {
        await TasksController.createNewTask(request, response, next);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it('Should call a json with a object"', async () => {
        await TasksController.createNewTask(request, response, next);
        expect(response.json.calledWith({ _id, ...insertTaskMock })).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      });
    });
  });  

  describe('Call getAllTasks Controller', () => {

    describe('Should return a array when exists tasks in database', () => {
      const response = {};
      const request = {};
      const tasks = [
        {     
          _id: '604cb554311d68f491ba5781',
          task: 'Testes',
          description: 'Realizar testes unitários no backend',
          status: 'pendente',
          createdDate: 1644605373207,
        }
      ];
      const next = () => {};

      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();

        sinon.stub(TasksServices, 'getAllTasks').resolves(tasks);
      });

      after(() => {
        TasksServices.getAllTasks.restore();
      });

      it('Should call with status 200', async () => {
        await TasksController.getAllTasks(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Should call a json with a array of objects"', async () => {
        await TasksController.createNewTask(request, response, next);
        expect(response.json.calledWith(tasks)).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });

    describe('Should return a empty array when not exists tasks in database', () => {
      const response = {};
      const request = {};
      const next = () => {};

      before(() => {
        request.body = {};

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().resolves();

        sinon.stub(TasksServices, 'getAllTasks').resolves([]);
      });

      after(() => {
        TasksServices.getAllTasks.restore();
      });

      it('Should call with status 200', async () => {
        await TasksController.getAllTasks(request, response, next);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('Should call a json with a empty array"', async () => {
        await TasksController.createNewTask(request, response, next);
        expect(response.json.calledWith([])).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
      });
    });
  });

});