# project-hospital


# 🏥 CRUD de Leitos

## 🔍 Filtragem

### Front-end:
- Filtros por:
  - Nome do leito.
  - Número do prontuário.
  - Status de checagem: `Checado` | `Pendente`.
  - Status de ocupação: `Ocupado` | `Disponível`.
- URL com estados dos filtros usando **query params**.

### Back-end:
- Suporte a **query params** para:
  - `nome` (string | opcional).
  - `prontuario` (string | opcional).
  - `statusChecagem` (enum: `"Checado"`, `"Pendente"`).
  - `statusOcupacao` (enum: `"Ocupado"`, `"Disponível"`).

---

## 📋 Listagem de Leitos

- Exibição de cards para cada leito com:
  - **Identificação do leito**.
  - **Número do prontuário** (ou "Sem paciente").
  - **Status de checagem** com indicador visual:
    - 🟢 **Verde** para "Checado".
    - 🔴 **Vermelho** para "Pendente".
  - **Status de ocupação** com indicador visual:
    - 🟢 **Verde** para "Disponível".
    - 🔴 **Vermelho** para "Ocupado".
  - Botão para acessar **detalhes do leito**.

---

## ⚙️ Outras Funcionalidades:

- Carregamento dinâmico da lista após aplicar filtros.
- Mensagem de feedback caso **nenhum leito corresponda** aos filtros.
- Suporte a **paginação** (opcional, dependendo do volume de dados).

---

# 🏗️ Definição do CRUD

## 📌 1. Criação de Leito (Create)

- **Endpoint:** `POST /leitos`
- **Campos necessários:**
  - `nome` (string) — Identificação do leito.
  - `prontuario` (string | opcional) — Número do prontuário, se houver paciente.
  - `statusChecagem` (enum: `"Checado"`, `"Pendente"`) — Estado da última checagem.
  - `statusOcupacao` (enum: `"Ocupado"`, `"Disponível"`) — Disponibilidade do leito.

---

## 🔍 2. Listagem de Leitos (Read)

- **Endpoint:** `GET /leitos`
- **Query Params:**
  - `nome` (string | opcional).
  - `prontuario` (string | opcional).
  - `statusChecagem` (enum: `"Checado"`, `"Pendente"`).
  - `statusOcupacao` (enum: `"Ocupado"`, `"Disponível"`).

- **Resposta:** Lista de leitos com informações básicas (como visto na tela).

- **Endpoint para detalhes:** `GET /leitos/{id}`
  - **Resposta:** Informações completas do leito selecionado.

---

## ✏️ 3. Atualização de Leito (Update)

- **Endpoint:** `PUT /leitos/{id}`
- **Campos possíveis para atualização:**
  - `prontuario` (string | opcional) — Para associar ou remover paciente.
  - `statusChecagem` (enum: `"Checado"`, `"Pendente"`) — Atualização do status de checagem.
  - `statusOcupacao` (enum: `"Ocupado"`, `"Disponível"`) — Atualização do status de ocupação.

---

## 🗑️ 4. Exclusão de Leito (Delete)

- **Endpoint:** `DELETE /leitos/{id}`
- **Ação:** Remove o leito do sistema (pode exigir confirmação).

---

# food-addiction-project
