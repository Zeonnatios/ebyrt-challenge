// const sinon = require('sinon');
// const chai = require('chai');
// const { MongoClient, ObjectId  } = require('mongodb');
// const { getConnection } = require('../../mocks/connections');
// const {insertTaskMock, updateTaskMock} = require('../../mocks/tasks');
// const TasksModel = require('../../../models/TasksModel');

// const { expect } = chai;

// describe('Test TasksModel', () => {
//   describe('Insert a new Task', () => {
//     let connectionMock;

//     beforeEach(async () => {
//       connectionMock = await getConnection();
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//     });
  
//     afterEach(async () => {
//       MongoClient.connect.restore();
//       await connectionMock.db('ebytr').collection('tasks').deleteMany({});
//     });

//     it('Return a object', async () => {
//       const response = await TasksModel.createNewTask(insertTaskMock);
//       expect(response).to.be.a('object');
//     });

//     it('Return a object with properties', async () => {
//       const response = await TasksModel.createNewTask(insertTaskMock);  
//       expect(response).to.have.a.property('_id');
//       expect(response).to.have.a.property('task');
//       expect(response).to.have.a.property('description');
//       expect(response).to.have.a.property('status');
//       expect(response).to.have.a.property('createdDate');
//     });

//     it('Should exist a task in DB', async () => {
//       await TasksModel.createNewTask(insertTaskMock);  
//       const taskCreated = await connectionMock
//         .db('ebytr')
//         .collection('tasks')
//         .findOne({ task: insertTaskMock.task });
//       expect(taskCreated).to.be.not.null;
//     });

//   });

//   describe('Update a Task', () => {
//     let connectionMock;

//     beforeEach(async () => {
//       connectionMock = await getConnection();
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//     });
  
//     afterEach(async () => {
//       MongoClient.connect.restore();
//       await connectionMock.db('ebytr').collection('tasks').deleteMany({});
//     });

//     it('Return a object', async () => {
//       const response = await TasksModel.createNewTask(insertTaskMock);
//       const id = response._id;
//       const updateResponse = await TasksModel.updateTask(id, updateTaskMock);
//       expect(updateResponse).to.be.a('object');
//     });

//     it('Should exist a task in DB', async () => {
//       const response = await TasksModel.createNewTask(insertTaskMock);
//       const updateResponse = await TasksModel.updateTask(response._id, updateTaskMock);
//       const taskUpdated = await connectionMock
//         .db('ebytr')
//         .collection('tasks')
//         .findOne({ task: updateResponse.task });
//       expect(taskUpdated).to.be.not.null;
//     });

//     it('Return null', async () => {
//       const updateTask = await TasksModel.updateTask('123erro123', updateTaskMock);
//       expect(updateTask).to.be.null;
//     })

//   });

//   describe('Get Tasks', () => {
//     let connectionMock;

//     beforeEach(async () => {
//       connectionMock = await getConnection();
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//       await TasksModel.createNewTask(insertTaskMock);
//     });
  
//     afterEach(async () => {
//       MongoClient.connect.restore();
//       await connectionMock.db('ebytr').collection('tasks').deleteMany({});
//     });

//     it('Return a array of object', async () => {
//       const response = await TasksModel.getAllTasks();
//       expect(response).to.have.lengthOf(1);
//       expect(response[0]).to.have.a.property('_id');
//       expect(response[0]).to.have.a.property('task');
//       expect(response[0]).to.have.a.property('description');
//       expect(response[0]).to.have.a.property('status');
//       expect(response[0]).to.have.a.property('createdDate');
//     });

//     it('Return null', async () => {
//       const getTaskById = await TasksModel.getTaskById('123erro123');
//       expect(getTaskById).to.be.null;
//     })

//   });

//   describe('Delete a Task', () => {
//     let connectionMock;

//     beforeEach(async () => {
//       connectionMock = await getConnection();
//       sinon.stub(MongoClient, 'connect').resolves(connectionMock);
//       await TasksModel.createNewTask(insertTaskMock);
//     });
  
//     afterEach(async () => {
//       MongoClient.connect.restore();
//       await connectionMock.db('ebytr').collection('tasks').deleteMany({});
//     });

//     it('Return a message', async () => {
//       const tasks = await TasksModel.getAllTasks();
//       const deletedTask = await TasksModel.excludeTask(tasks[0]._id);
//       expect(deletedTask).to.deep.equal({ message: 'Tarefa excluída com sucesso!' });
//     });

//     it('Return null', async () => {
//       const tasks = await TasksModel.getAllTasks();
//       const deletedTask = await TasksModel.excludeTask('123erro123');
//       expect(deletedTask).to.be.null;
//     })

//   });

// });