const authRouter = require('./auth');
const usersRouter = require('./users');
const showsRouter = require('./shows');
const customersRouter = require('./customers');
const agentsRouter = require('./agents');
const commercialsRouter = require('./commercials');

module.exports = {
  authRouter,
  usersRouter,
  showsRouter,
  customersRouter,
  agentsRouter,
  commercialsRouter,
};
