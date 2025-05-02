## 🔒 Auth Service - Estudo de JWT, Prisma e Clean Architecture

Este projeto foi criado para estudar autenticação com JWT no backend utilizando Node.js e Prisma ORM para persistência no banco de dados.
Além disso, foi o primeiro projeto para começar a aplicar conceitos de Clean Architecture de forma prática.

## 🚀 Tecnologias usadas
Node.js | Express.js | Prisma ORM | MySql | JWT (JSON Web Token) | Bcrypt.js (hash de senhas) | 

Cookie-Parser | Dotenv | Docker & Docker Compose



## 📑 Funcionalidades

Cadastro de novo usuário

Login com verificação de senha hash

Geração de Access Token (curta duração)

Geração de Refresh Token (longa duração via cookies)

Refresh de Access Token

Logout com remoção do Refresh Token

Endpoint /me para buscar usuário logado

Proteção de rotas via middleware de autenticação

Persistência dos usuários com Prisma e banco de dados


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

## 🚀 Próximos Passos
Implementar testes automatizados (Jest)
