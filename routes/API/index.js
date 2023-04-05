const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/api/users', userRoutes);

router.use('/api/thoughts', thoughtRoutes);

module.exports = router;