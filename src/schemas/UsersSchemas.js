const message = {
  fieldType: 'The field is not a string',
  invalidEntry: 'Invalid entries. Try again',
  emptyFields: 'All fields must be filled',
  notFoundById: 'Wrong id format',
};

const isNotString = (value) => (typeof value !== 'string');

const isValidTask = (title, createdDate, status) => (!title || !createdDate 
  || createdDate === undefined || !status);
  
const isValidEmail = (email) => {
  const parseEmail = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/;
  return parseEmail.test(email);
};

const isValidPassword = (password) => password.length >= 6;

const validateTask = (user) => {
  const { name, email, password } = user;
  switch (true) {
    case isNotString(name): return { message: message.fieldType };
    case isValidTask(name, email, password): return { message: message.emptyFields };
    case isValidEmail(email): return { message: message.invalidEntry }; 
    case isValidPassword(password): return { message: message.invalidEntry };
    default: return {};
  }
};

const errorToExcludeTask = { message: message.notFoundById };

module.exports = { validateTask, errorToExcludeTask };
