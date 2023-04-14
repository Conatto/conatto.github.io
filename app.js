const express = require("express");
const path = require("path");
const app = express();


app.use(express.static(__dirname + "/"));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})
app.get("/home", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})
app.get("/projetos", (request, response) => {
    response.sendFile(__dirname + "/projetos.html");
})
app.get("/*", (request, response) => {
    response.sendFile(__dirname + "/index.html");
})

app.listen(4004, () => console.log("Servidor rodando na porta 4004"));