## 🔒 Auth Service - Estudo de JWT, Prisma e Clean Architecture

Este projeto foi criado para estudar autenticação com JWT no backend utilizando Node.js e Prisma ORM para persistência no banco de dados.
Além disso, foi o primeiro projeto para começar a aplicar conceitos de Clean Architecture de forma prática.

## 🚀 Tecnologias usadas
Node.js

Express.js

Prisma ORM

MySql

JWT (JSON Web Token)

Bcrypt.js (hash de senhas)

Cookie-Parser

Dotenv

## 🗄️ Modelo de Usuário (Prisma)
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

 
## 🧪 Rotas disponíveis

Método	Rota	Descrição

POST	`/api/users/`	Registrar novo usuário

POST	`/api/auth/login` 	Autenticar usuário e receber tokens

POST	`/api/auth/refresh`	Renovar o Access Token

POST	`/api/auth/logout`	Fazer logout do usuário

GET	`/api/auth/me`	Obter informações do usuário logado

GET `/api/auth/check` Verificar Acesso Rota protegida.


## ⚙️ Como rodar o projeto
# Clone o repositório:

```
git clone <URL-do-repositório>
cd <nome-da-pasta>
```

Instale as dependências:

```
npm install
```

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto:

```
DATABASE_URL="sua-URL-do-banco-de-dados"
JWT_ACCESS_TOKEN_SECRET="sua-chave-secreta-acesso"
JWT_REFRESH_TOKEN_SECRET="sua-chave-secreta-refresh"
PORT=3000
```

Gere o cliente Prisma:

```
npx prisma generate
```

Rode as migrations para criar as tabelas:

```
npx prisma migrate dev
```

Inicie a aplicação:

```
npm run dev
```


## 🚀 Próximos Passos

Implementar roles e permissões (admin, usuário normal)

Melhorar a segurança dos tokens (blacklist e revogação)

Implementar testes automatizados (Jest)
