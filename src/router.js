const express = require('express');

const loginRoutes = express.Router();

loginRoutes.get('/', (req, res)=> {
    return res.status(200).send({title: "SafeEdu API", version: "1.0.0"}).end();
});

module.exports = loginRoutes;