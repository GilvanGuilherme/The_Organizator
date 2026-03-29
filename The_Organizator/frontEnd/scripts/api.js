const URL = "http://localhost:3000/tarefas"

// buscar tarefas
export async function buscarTarefas() {

    try {

        const response = await fetch(URL)

        const dados = await response.json()

        return dados

    } catch (error) {

        alert("Erro ao buscar tarefas")

    }

}

// adicionar tarefa
export async function adicionarTarefa(tarefa) {

    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })

}