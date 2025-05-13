## 🔒 Auth Service - Estudo de JWT, Prisma e Clean Architecture

Este projeto foi criado para estudar autenticação com JWT no backend utilizando Node.js e Prisma ORM para persistência no banco de dados.
Além disso, foi o primeiro projeto para começar a aplicar conceitos de Clean Architecture de forma prática.

## 🚀 Tecnologias usadas
Node.js | Express.js | Prisma ORM | MySql | JWT (JSON Web Token) | Bcrypt.js (hash de senhas) | Winston | express-rate-limit | csurf |
Jest e Supertest | Docker & Docker Compose | Cookie-Parser | Dotenv 



## 📑 Funcionalidades

- ### Autenticação JWT: 
  Login de usuário com emissão de Access Token e Refresh Token em JSON Web Tokens, validando credenciais com segurança.

- ### Registro de usuário:
  Endpoint para cadastrar novos usuários com senha criptografada (bcrypt).

- ### Rotas protegidas: 
  Middleware que verifica o JWT em rotas que exigem autenticação.

- ### Arquitetura limpa: 
  Código organizado em camadas (controladores, serviços, repositórios, etc.), facilitando manutenção e testes.

- ### Observabilidade: 
  Logs detalhados de requisições e erros são gerados usando o Winston. Isso ajuda na depuração e monitoração básica da API.

- ### Segurança adicional:
  - Rate Limiting: 
    Limita tentativas de login consecutivas (via `express-rate-limit` ) para evitar brute force.

  - Proteção CSRF: Endpoint `GET /csrf-token` que retorna um token CSRF válido (usando `csurf`), para proteger formulários/autenticações do front-end contra ataques CSRF.

- ### Testes automatizados: 
  Conjunto de testes unitários e de integração escrito com Jest e Supertest, garantindo que as principais rotas de autenticação funcionam corretamente.

- ### Ambiente Docker Compose: 
  Arquivo docker-compose.yml configura containers para o servidor Node e o banco MySQL, facilitando a inicialização completa do sistema.



## 🗄️ Modelo de Usuário (Prisma)

> ⚠️ **Importante:**  
> O modelo de usuário está implementado temporariamente dentro do Auth Service por simplicidade.  
> Em uma arquitetura mais completa ou em produção, esse modelo e sua lógica idealmente estariam isolados em um serviço de usuários (User Service).


```prisma
model User {
  id        String   @id @default(uuid()) @db.Char(36)
  password  String
  email     String   @unique
  role      Role
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```
 
## 🧪 Rotas disponíveis

POST	`/api/users/`	Registrar novo usuário

POST	`/api/auth/login` 	Autenticar usuário e receber tokens

POST	`/api/auth/refresh`	Renovar o Access Token

POST	`/api/auth/logout`	Fazer logout do usuário

GET	`/api/auth/me`	Obter informações do usuário logado

GET `/api/auth/check` Verificar Acesso Rota protegida.

GET `/api/auth/csfr-token` Obter o CSFR Token.

 ⚠️ **Observação:**  
> Primeiro chamem GET `/api/auth/csrf-token`
> Depois incluam o token no header `X-CSRF-Token` ao fazer `POST /refresh` ou `POST /logout`


## ⚙️ Como rodar o projeto

Clone o repositório:

```
git clone <URL-do-repositório>
cd <nome-da-pasta>
```

### 🐳 Ambiente com Docker 
O projeto agora utiliza Docker para facilitar o setup do ambiente de desenvolvimento.

📦 Subindo os containers

```
docker compose up --build
```

### Isso irá:

Subir o container com o banco MySQL

Subir o container com o serviço de autenticação

Expor a aplicação em http://localhost:3000

🌐 Variáveis de ambiente usadas

```
DATABASE_URL="mysql://usuario:root@mysql-db:3306/authdb"
PORT=3000
JWT_ACCESS_TOKEN_SECRET=suachavesecreta
JWT_REFRESH_TOKEN_SECRET=suarefreshsecreta
```

## 🚀 Testes de integração com Jest
O projeto inclui testes automatizados das principais funcionalidades de autenticação.
Supertest (para testes de integração das rotas HTTP). Para executá-los, rode:
```
docker exec -it "Docker Container" npm test tests/services/"nomedoteste".mjs
```
