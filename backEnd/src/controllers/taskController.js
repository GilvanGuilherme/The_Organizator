let tarefas = []

exports.listar = (req, res) => {
    res.json(tarefas)
}

exports.criar = (req, res) => {

    const nova = {
        id: Date.now(),
        nome: req.body.nome
    }

    tarefas.push(nova)

    res.json(nova)
}