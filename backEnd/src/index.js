const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// rota de teste
let tarefas = []

app.get("/tarefas", (req, res) => {
    res.json(tarefas)
})

app.post("/tarefas", (req, res) => {

    const nova = {
        id: Date.now(),
        nome: req.body.nome
    }

    tarefas.push(nova)

    res.json(nova)
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})