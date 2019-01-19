const router = require('express').Router();
const todoRoutes = require('./todo');
const authRoutes = require('./auth');

router.use('/todo', todoRoutes);
router.use('/auth', authRoutes);

module.exports = router;