const Joi = require('joi');
const { StatusCodes: { CONFLICT } } = require('http-status-codes');

const validatorCreateTask = (task, description, status) => {
  const { error } = Joi.object({
    task: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
  }).validate({ task, description, status });
  return error;
};

const validateNewTask = (req, _res, next) => {
  const { task, description, status } = req.body;
  const isNotValid = validatorCreateTask(task, description, status);

  if (isNotValid) {
    return next({ status: CONFLICT, message: isNotValid.message });
  }
  return next();
};

const validatorUpdateTask = (task, description, status, createdDate) => {
  const { error } = Joi.object({
    task: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    createdDate: Joi.date().timestamp().raw().required(),
  }).validate({ task, description, status, createdDate });
  return error;
};

const validateUpdateTask = (req, _res, next) => {
  const { task, description, status, createdDate } = req.body;
  const isNotValid = validatorUpdateTask(task, description, status, createdDate);

  if (isNotValid) {
    return next({ status: CONFLICT, message: isNotValid.message });
  }
  return next();
};

module.exports = { validateNewTask, validateUpdateTask };