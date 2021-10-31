const connection = require('../connection/connections');

const getAllTasks = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const createNewTask = async ({ task, description, status }) => {
  const db = await connection();
  const currentData = new Date();
  const newTask = {
    task,
    description,
    status,
    createdData: currentData,
    lastUpdate: currentData,
  };
  const inserted = await db.collection('tasks').insertOne(newTask);
  return { _id: inserted.insertedId, ...newTask };
};

module.exports = { getAllTasks, createNewTask };