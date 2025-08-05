const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const routes = express.Router();

const MiddlewareAuth = require('./middlewares/auth');
const User = require('./controllers/user');
const Motd = require('./controllers/motd');
const Escola = require('./controllers/escola');
const Comentario = require('./controllers/comentario');
const Imagem = require('./controllers/imagem');

routes.get('/', (req, res) => {
    return res.status(200).json({ title: "SafeEdu API", version: "1.0.0" }).end();
});

routes.post('/api/login', User.login);
routes.post('/api/validate', User.validaToken);
routes.get('/api/users', MiddlewareAuth.validate, User.read);
routes.post('/api/users', User.create);

routes.get('/api/motds', Motd.read);

routes.get('/api/escolas', Escola.read);

routes.get('/api/comentarios', Comentario.read);
routes.post('/api/comentarios', Comentario.create);

routes.get('/api/imagens', Imagem.read);
routes.post('/api/imagens', upload.single('imagem'), Imagem.create);


module.exports = routes;