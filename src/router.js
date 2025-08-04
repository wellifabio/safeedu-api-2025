const express = require('express');

const routes = express.Router();

const MiddlewareAuth = require('./middlewares/auth');
const User = require('./controllers/user');

routes.get('/', (req, res)=> {
    return res.status(200).json({title: "SafeEdu API", version: "1.0.0"}).end();
});

routes.post('/api/login', User.login);
routes.post('/api/validate', User.validaToken);
routes.get('/api/users', MiddlewareAuth.validate, User.read);
routes.post('/api/users', User.create);
routes.patch('/api/users/:id', MiddlewareAuth.validate, User.update);
routes.delete('/api/users/:id', MiddlewareAuth.validate, User.del);

module.exports = routes;