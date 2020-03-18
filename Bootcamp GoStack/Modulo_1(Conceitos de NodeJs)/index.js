const express = require("express");

const server = express();

server.use(express.json());

// query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Ayalla", "Email": "ayalla@email.com"}
// CRUD = Create, Read, Update, Delete

const users = ["Joao", "Victor", "Ayalla"];

server.use((req, res, next) => {
  console.log("A requisição foi chamada!");

  // retorno next para que o resto da aplicacao nao seja interrompido
  return next();
});

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  // chamo next para executar o que tem abaixo no codigo
  next();

  // finalizo com o log do tempo de execução
  console.timeEnd("Request");
});

// verificar se no corpo da requisição existe o user
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

// verificar se o indice que quer ser acessado existe
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/teste", checkUserInArray, (req, res) => {
  const nome = req.query.nome;

  // para o query
  return res.json({
    message: `Opa ${nome}`
  });
});

server.get("/users1/:id", checkUserInArray, (req, res) => {
  const id = req.params.id;

  // para o route com o id
  return res.json({
    message: `Buscando o usuario: ${id}`
  });
});

server.get("/users2/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  // para o route retornar o user com aquele index
  return res.json(req.user); // posso retornar req.user vindo da funcao checkUserInArray
});

server.get("/users", checkUserInArray, (req, res) => {
  return res.json(users); // retorna todos os usuarios
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  // adicionar usuario
  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  // editando usuarios
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  // deletando usuarios
  return res.json(users);
});

//localhost:3000
server.listen(3000);
