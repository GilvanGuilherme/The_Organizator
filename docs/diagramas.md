useCaseDiagram
actor "Usuário" as U
package "The Organizator" {
usecase "UC1 - Cadastrar Usuário" as UC1
usecase "UC2 - Efetuar Login" as UC2
usecase "UC3 - Cadastrar Atividade/Meta" as UC3
usecase "UC4 - Editar Atividade" as UC4
usecase "UC5 - Remover Atividade" as UC5
usecase "UC6 - Registrar Progresso (Total/Parcial)" as UC6
}
U --> UC1
U --> UC2
U --> UC3
U --> UC4
U --> UC5
U --> UC6

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

sequenceDiagram
participant U as Usuário
participant F as Front-end (UI)
participant B as Back-end (API)
participant DB as Banco de Dados SQL

    U->>F: Clica no botão "Remover"
    F->>B: DELETE /atividades/:id
    Note over B: Valida token de acesso
    B->>DB: DELETE FROM atividades WHERE id = :id
    DB-->>B: Confirma exclusão
    B-->>F: Retorna Status 200 (Sucesso)
    F-->>U: Remove item da lista na tela
