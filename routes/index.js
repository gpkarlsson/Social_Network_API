const router = require('express').Router();
const apiRoutes = require('./API');

router.use((req, res) => {
    return resizeBy.send('Wrong Route');
});

module.exports = apiRoutes;