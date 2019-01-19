const router = require('express').Router();
const RestAPI = require('./RestClass');
const controllers = require('../../controllers')
let passport = require('passport');
const config = require('../../config/passport');
config(passport);

const task = new RestAPI(router, controllers.todoController, passport)
task.findAll();
task.findOneAndUpdate();

module.exports = router;