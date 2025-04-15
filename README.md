## Estrutura do Projeto

O projeto é composto por múltiplos serviços:
- **Frontend**: Aplicação web em React/Vite
- **API Node.js**: Backend principal
- **API Python**: Serviço para processamento de dados
- **PostgreSQL**: Banco de dados

## Requisitos

- Docker e Docker Compose instalados
- Git para clonar o repositório

## Configuração das Variáveis de Ambiente

### 1. Arquivo .env na Raiz do Projeto

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```
POSTGRESQL_USERNAME="docker"
POSTGRESQL_PASSWORD="docker"
POSTGRESQL_DATABASE="food-adction"
POSTGRESQL_PORT_NUMBER="5432"

DATABASE_URL="postgresql://docker:docker@postgresql:5432/food-adction"
DB_URL="postgresql://docker:docker@postgresql:5432/food-adction"
```

### 2. Arquivo .env para a API Node.js

Crie um arquivo .env na pasta api-node com as seguintes variáveis:

```
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_aqui
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://docker:docker@postgresql:5432/food-adction
FIRST_ADMIN_PASSWORD=senha_admin_inicial
PUBLIC_DIR=/src/outputs
UPLOAD_DIR=/src/uploads
PORT=3000
MAX_FILE_SIZE_MB=10
PY_API_URL=http://python:5000
```

### 3. Arquivo .env para o Frontend

Crie um arquivo .env na pasta front-end com:

```
VITE_API_URL=http://localhost:3000
```

## Executando o Projeto

### Ambiente de Desenvolvimento

Execute o seguinte comando na raiz do projeto:

```bash
./start-dev.sh
```

Ou manualmente:

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

Isso irá:
- Construir e iniciar todos os contêineres
- Montar diretórios locais como volumes para desenvolvimento
- Configurar a rede para comunicação entre os serviços
- Expor as portas necessárias:
  - Frontend: http://localhost:5173
  - API Node.js: http://localhost:3000
  - API Python: http://localhost:5000
  - PostgreSQL: localhost:5432

## Verificação de Integridade do Projeto

O projeto inclui um mecanismo para verificar sua integridade usando um hash SHA-256. O hash é gerado a partir de todos os arquivos do projeto, excluindo o diretório .git e as pastas `node_modules`.

Para verificar a integridade do seu projeto, execute:

```bash
tar cf - --exclude='.git' --exclude='node_modules' . | sha256sum
```

O resultado deve corresponder ao hash de referência:
```
25bae6cdb9fe29a1adc93c277dc0b0236a15474ead7885e3a72894eca0ef2e94
```

Se os hashes não coincidirem, isso pode indicar modificações não autorizadas ou arquivos corrompidos.

## Solução de Problemas

- **Erro de conexão com o banco de dados**: Verifique se as variáveis de ambiente do PostgreSQL estão configuradas corretamente.
- **Serviços não se comunicam**: Certifique-se de que todos os serviços estão na mesma rede `my_network_food_adction`.
- **Volumes não persistem**: Verifique se os volumes `postgresql_data` e `shared_data` estão configurados corretamente.

Para visualizar logs dos contêineres:
```bash
docker logs [nome-do-container]
```

Para parar os serviços:
```bash
docker compose -f docker-compose.dev.yml down  # Para desenvolvimento
docker compose down  # Para produção

``` 
