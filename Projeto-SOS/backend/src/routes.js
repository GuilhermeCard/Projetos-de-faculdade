const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(null, false);
    }
}

const upload = multer({
    storage:
        storage,
    limits: {
        filefilter: fileFilter,
    }
});

const OngController = require('./controllers/OngController');
const PostController = require('./controllers/PostController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.getAllOngs);
routes.post('/ongs', OngController.create);

routes.get('/posts', PostController.getAllPosts);
routes.post('/posts', upload.single("imagem"), PostController.create);
routes.delete('/posts/:id', PostController.delete);

routes.get('/profile', ProfileController.getAllPostsByOng);

routes.get('/null',
    (req, res) => {
        res.send('Foto não disponivel')
    });

module.exports = routes;