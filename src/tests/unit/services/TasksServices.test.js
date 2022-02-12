const sinon = require('sinon');
const { expect } = require('chai');
const { insertTaskMock, updateTaskMock } = require('../../mocks/tasks');
const TasksModel = require('../../../models/TasksModel');
const TasksServices = require('../../../services/TasksServices');

describe('Test TasksService', () => {
  describe('Insert a new task', () => {
    before(() => {
      const _id = '604cb554311d68f491ba5781';
      sinon.stub(TasksModel, 'createNewTask').resolves({ _id, ...insertTaskMock });
    });

    after(() => {
      TasksModel.createNewTask.restore();
    });

    it('Return a object', async () => {
      const response = await TasksServices.createNewTask(insertTaskMock);
      expect(response).to.have.property('_id');
      expect(response).to.have.property('task');
      expect(response).to.have.property('description');
      expect(response).to.have.property('status');
      expect(response).to.have.property('createdDate');
      expect(response._id).to.equal('604cb554311d68f491ba5781');
      expect(response.task).to.equal('Testes');
      expect(response.description).to.equal('Realizar testes unitários no backend');
      expect(response.status).to.equal('pendente');
      expect(response.createdDate).to.equal(1644605373207);
    });
  });

  describe('Update a task', () => {
    const _id = '604cb554311d68f491ba5781';
    
    describe('Success', () => {
      before(async () => {
        sinon.stub(TasksModel, 'getTaskById').resolves({ _id, ...insertTaskMock });
        sinon.stub(TasksModel, 'updateTask').resolves({ _id, ...updateTaskMock });
      });
  
      after(() => {
        TasksModel.getTaskById.restore();
        TasksModel.updateTask.restore();
      });
  
      it('Return a object', async () => {
        const response = await TasksServices.updateTask();
        expect(response).to.have.property('_id');
        expect(response).to.have.property('task');
        expect(response).to.have.property('description');
        expect(response).to.have.property('status');
        expect(response).to.have.property('createdDate');
        expect(response._id).to.equal('604cb554311d68f491ba5781');
        expect(response.task).to.equal('Testes');
        expect(response.description).to.equal('Realizar testes unitários no backend com mocha');
        expect(response.status).to.equal('pronto');
        expect(response.createdDate).to.equal(1644605373207);
      });
    });

    describe('Error, not find task by id', () => {
      it('Return a error message', async () => {
        const response = await TasksServices.excludeTask(_id);
        expect(response).to.deep.equal({ error: true, message: 'Tarefa não encontrada para excluir!' });
      });
    })

  });

  describe('Get all tasks', () => {
    const _id = '604cb554311d68f491ba5781';
    before(async () => {
      sinon.stub(TasksModel, 'getTaskById').resolves({ _id, ...insertTaskMock });
      sinon.stub(TasksModel, 'getAllTasks').resolves([{ _id, ...updateTaskMock }]);
    });

    after(() => {
      TasksModel.getTaskById.restore();
      TasksModel.getAllTasks.restore();
    });

    it('Return a array of a object', async () => {
      const response = await TasksServices.getAllTasks();
      expect(response[0]).to.have.property('_id');
      expect(response[0]).to.have.property('task');
      expect(response[0]).to.have.property('description');
      expect(response[0]).to.have.property('status');
      expect(response[0]).to.have.property('createdDate');
      expect(response[0]._id).to.equal('604cb554311d68f491ba5781');
      expect(response[0].task).to.equal('Testes');
      expect(response[0].description).to.equal('Realizar testes unitários no backend com mocha');
      expect(response[0].status).to.equal('pronto');
      expect(response[0].createdDate).to.equal(1644605373207);
    });

  });

  describe('Delete a tasks', () => {
    const _id = '604cb554311d68f491ba5781';
    describe('Success', () => {

      before(async () => {
        sinon.stub(TasksModel, 'getTaskById').resolves({ _id, ...insertTaskMock });
        sinon.stub(TasksModel, 'excludeTask').resolves({ message: 'Tarefa excluída com sucesso!' });
      });

      after(() => {
        TasksModel.getTaskById.restore();
        TasksModel.excludeTask.restore();
      });

      it('Return a message', async () => {
        const response = await TasksServices.excludeTask(_id);
        expect(response).to.deep.equal({ message: 'Tarefa excluída com sucesso!' });
      });
    });

    describe('Error, not find task by id', () => {
      it('Return a error message', async () => {
        const response = await TasksServices.excludeTask(_id);
        expect(response).to.deep.equal({ error: true, message: 'Tarefa não encontrada para excluir!' });
      });
    })

  });

});