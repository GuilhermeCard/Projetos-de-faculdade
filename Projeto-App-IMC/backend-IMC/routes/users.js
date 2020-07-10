var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const pessoas = [
  {
    nome: 'Guilherme Cardoso',
    dta_nascimento: '17/03/1997',
    peso: 80,
    altura: 1.78,
    login: 'guilherme@gmail.com',
    senha: 'admin'
  }
];

for (var i of pessoas);

const users = [
  {
    login: i.login,
    senha: i.senha
  }
];


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ "Message": 'respond with a resource' });
});


router.get('/usuarios', function (req, res) {
  res.send({ "Usuarios": users })
});

router.get('/cadastro', function (req, res, next) {
  res.send({ "Cadastros": pessoas })
});

router.post('/cadastro', function (req, res, next) {
  pessoas.push(req.body)
  users.push({
    login: req.body.login,
    senha: req.body.senha
  })

  res.send({ "Message": "Seu request chegou com esses dados", "Dados": req.body });
});

router.post('/login', function (req, res, next) {
  for (var itens of users);

  if (req.body.login === itens.login && req.body.senha === itens.senha) {
    const responseJwt = jwt.sign({
      role: 'Admin',
      permissoes: ['permissao1', 'permissao2']
    }, "DOTAEMELHOR", { expiresIn: '2d' });
    res.send({ "Message": "Você está autorizado", "JWT": responseJwt });
  }
  else {
    res.send({ "Message": "Você não está autorizado", "JWT": {} });
  }

});

module.exports = router;
