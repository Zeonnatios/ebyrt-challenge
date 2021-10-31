const { ObjectId } = require('mongodb');
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

const updateTask = async ({ id, task, description, status, createdData }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  await db.collection('tasks').updateOne(
    { _id: ObjectId(id) }, 
    { $set: { task, description, status, createdData } },
  );

  return { _id: id, task, description, status, createdData };
};

module.exports = { getAllTasks, createNewTask, updateTask };