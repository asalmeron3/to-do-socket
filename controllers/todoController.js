const db = require('../models');
const getToken = require('../config/getToken');

module.exports = {
  create: (task, cb) => {
    db.Todo
    .create(task)
    .then( newEntry => cb(newEntry))
    .catch( err => cb(err))
  },
  findAll : (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Todo
      .find({})
      .then( allTodos => res.json(allTodos))
      .catch( err => res.status(422).json(err))
      } else {
        return res.send({success: false, msg: "Access restricted. Credentials needed."})
      }
  },
  findOneAndUpdate: (req, res) => {
    const token = getToken(req.headers)
    if (token) {
      db.Todo
      .findOneAndUpdate({ [req.params.resourceName]: req.params.identifier}, {$set: {completed: req.body.completed}}, {new:true})
      .then( oneTodo => res.json(oneTodo))
      .catch( err => res.status(422).json(err))
    } else {
      return res.send({success: false, msg: 'Access restricted. Credentials needed.'})
    }
  }
}