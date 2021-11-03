const rescue = require('express-rescue');
const UsersServices = require('../services/UsersServices');
const httpStatusCode = require('../helpers/httpStatus');

const getAllUsers = rescue(async (req, res) => {
  const data = await UsersServices.getAllUsers();
  return res.status(httpStatusCode.ok).json(data);
});

const createNewuser = rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const data = await UsersServices.createNewuser({ name, email, password });

  if (data.err) return res.status(httpStatusCode.badRequest).json(data);

  return res.status(httpStatusCode.created).json(data);
});

const updateUser = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const data = await UsersServices.updateUser({ id, name, email, password });

  if (data.err) return res.status(httpStatusCode.badRequest).json(data);

  return res.status(httpStatusCode.ok).json(data);
  });

const excludeUser = rescue(async (req, res) => {
  const { id } = req.params;
  const data = await UsersServices.excludeUser({ id });

  if (data.err) return res.status(httpStatusCode.notFound).json(data);

  return res.status(httpStatusCode.ok).json(data);
});

module.exports = { getAllUsers, createNewuser, updateUser, excludeUser };