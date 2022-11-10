const { User } = require('../models/User');

async function validUser(req, res, next) {
  const id = req.params.id;
  req.user = await User.findByPk(id);
  if (req.user) {
    next();
  } else {
    return res.status(404).send(`User does not exist with id: ${id}`);
  }
}

module.exports = validUser;