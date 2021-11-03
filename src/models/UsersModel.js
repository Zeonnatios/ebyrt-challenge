const { ObjectId } = require('mongodb');
const connection = require('../connection/connections');

const getUserById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  const user = db.collection('users').findOne(ObjectId(id));
  return user;
};

const getAllUsers = async () => {
  const db = await connection();
  const users = await db.collection('users').find().toArray();
  return users;
};

const createNewuser = async ({ name, email, password }) => {
  const db = await connection();
  const inserted = await db.collection('users').insertOne({ name, email, password });
  return { _id: inserted.insertedId, name, email, password };
};

const updateUser = async ({ id, name, email, password }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  await db.collection('users').updateOne(
    { _id: ObjectId(id) }, 
    { $set: { name, email, password } },
  );

  return { _id: id, name, email, password };
};

const excludeUser = async ({ id }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  const user = await getUserById(id);
  await db.collection('users').deleteOne({ _id: ObjectId(id) });
  return user;
};

module.exports = { getUserById, getAllUsers, createNewuser, updateUser, excludeUser };