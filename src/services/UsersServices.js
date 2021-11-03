const UsersModel = require('../models/UsersModel');
const UsersSchemas = require('../schemas/UsersSchemas');

const getAllUsers = async () => {
  const data = await UsersModel.getAllUsers();
  return data;
};

const createNewuser = async (user) => {
  const validate = UsersSchemas.validateUser(user);
  
  if (validate.message) return { err: validate };

  const data = await UsersModel.createNewuser(user);
  return data;
};

const updateUser = async (user) => {
  const validate = UsersSchemas.validateUser(user);
  if (validate.message) return { err: validate };

  const data = UsersModel.updateUser(user);
  return data;
};

const excludeUser = async (id) => {
  const data = await UsersModel.excludeUser(id);
  if (!data) return { err: UsersSchemas.errorToExcludeUser };

  return data;
};

module.exports = { getAllUsers, createNewuser, updateUser, excludeUser };