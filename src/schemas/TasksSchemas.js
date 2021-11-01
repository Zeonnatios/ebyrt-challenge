const message = {
  titleType: 'The field is not a string',
  emptyFields: 'All fields must be filled',
  notFoundById: 'Wrong id format',
};

const isNotString = (value) => (typeof value !== 'string');
const isValidTask = (title, createdDate, status) => (!title || !createdDate 
  || createdDate === undefined || !status);

const validateTask = (task) => {
  const { title, status, createdDate } = task;
  switch (true) {
    case isNotString(title): return { message: message.titleType };
    case isValidTask(title, status, createdDate): return { message: message.emptyFields };
    default: return {};
  }
};

const errorToExcludeTask = { message: message.notFoundById };

module.exports = { validateTask, errorToExcludeTask };
