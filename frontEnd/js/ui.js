export function mostrarTarefas(tarefas) {

    const lista = document.getElementById("lista")

    lista.innerHTML = ""

    tarefas.forEach(tarefa => {

        const li = document.createElement("li")

        li.innerHTML = `
            ${tarefa.nome}
        `

        lista.appendChild(li)

    })

}