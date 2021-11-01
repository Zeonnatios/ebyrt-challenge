const { ObjectId } = require('mongodb');
const connection = require('../connection/connections');

const getTaskById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  const task = db.collection('tasks').findOne(ObjectId(id));
  return task;
};

const getAllTasks = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const createNewTask = async ({ title, description, status, createdDate }) => {
  const db = await connection();
  const inserted = await db.collection('tasks').insertOne(
    { title, description, status, createdDate },
  );
  return { _id: inserted.insertedId, title, description, status, createdDate };
};

const updateTask = async ({ id, title, description, status, createdDate }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  await db.collection('tasks').updateOne(
    { _id: ObjectId(id) }, 
    { $set: { title, description, status, createdDate } },
  );

  return { _id: id, title, description, status, createdDate };
};

const excludeTask = async ({ id }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  const task = await getTaskById(id);
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  return task;
};

module.exports = { getAllTasks, createNewTask, updateTask, excludeTask };