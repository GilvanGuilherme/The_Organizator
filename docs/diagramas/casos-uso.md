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
