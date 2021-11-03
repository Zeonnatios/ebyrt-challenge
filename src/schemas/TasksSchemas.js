const message = {
  titleType: 'The field is not a string',
  emptyFields: 'All fields must be filled',
  notFoundById: 'Wrong id format',
};

const isNotString = (value) => (typeof value !== 'string');
const isValidTask = (task, createdDate, status) => (!task || !createdDate 
  || createdDate === undefined || !status);

const validateTask = ({ task, status, createdDate }) => {
  switch (true) {
    case isNotString(task): return { message: message.titleType };
    case isValidTask(task, status, createdDate): return { message: message.emptyFields };
    default: return {};
  }
};

const errorToExcludeTask = { message: message.notFoundById };

module.exports = { validateTask, errorToExcludeTask };
