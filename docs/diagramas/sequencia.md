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
