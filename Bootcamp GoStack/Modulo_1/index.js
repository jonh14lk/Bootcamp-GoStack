const express = require("express");

const server = express();

server.use(express.json());

// query params = ?teste=1
// Route params = /users/1
// Request body = {"name": "Ayalla", "Email": "ayalla@email.com"}
// CRUD = Create, Read, Update, Delete

const users = ["Joao", "Victor", "Ayalla"];

server.get("/teste", (req, res) => {
  const nome = req.query.nome;

  // para o query
  return res.json({
    message: `Opa ${nome}`
  });
});

server.get("/users1/:id", (req, res) => {
  const id = req.params.id;

  // para o route com o id
  return res.json({
    message: `Buscando o usuario: ${id}`
  });
});

server.get("/users2/:index", (req, res) => {
  const { index } = req.params;

  // para o route retornar o user com aquele index
  return res.json(users[index]);
});

server.get("/users", (req, res) => {
  return res.json(users); // retorna todos os usuarios
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  // adicionar usuario
  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  // editando usuarios
  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  // deletando usuarios
  return res.json(users);
});

//localhost:3000
server.listen(3000);
