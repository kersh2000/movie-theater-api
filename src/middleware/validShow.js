const { Show } = require('../models/Show');

async function validShow(req, res, next) {
  const id = req.params.id;
  req.show = await Show.findByPk(id);
  if (req.show) {
    next();
  } else {
    return res.status(404).send(`Show does not exist with id: ${id}`);
  }
}

module.exports = validShow;