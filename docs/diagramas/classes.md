classDiagram
class Usuario {
+int id
+string nome
+string email
-string senha
+cadastrar()
+login()
}

    class Atividade {
        +int id
        +string titulo
        +string descricao
        +date dataInicio
        +date dataConclusao
        +string status
        +salvar()
        +editar()
        +excluir()
    }

    Usuario "1" -- "*" Atividade : gerencia
