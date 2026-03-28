import { buscarTarefas, adicionarTarefa } from "./api.js"
import { mostrarTarefas } from "./ui.js"

const input = document.getElementById("inputTarefa")
const botao = document.getElementById("btnAdicionar")

// carregar tarefas
async function carregarTarefas() {

    const tarefas = await buscarTarefas()

    mostrarTarefas(tarefas)

}

// clicar no botão
botao.addEventListener("click", async () => {

    const texto = input.value

    if(texto === "") return

    await adicionarTarefa({
        nome: texto
    })

    input.value = ""

    carregarTarefas()

})

carregarTarefas()