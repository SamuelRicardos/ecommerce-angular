# 🛒 E-commerce com Angular 17, Angular Material e Spring Boot

Este projeto é uma aplicação completa de e-commerce com funcionalidades de CRUD de produtos, carrinho de compras, checkout com validação e autenticação de usuários. O front-end foi desenvolvido com Angular 17 e Angular Material, enquanto o back-end utiliza Spring Boot com MongoDB.

🔗 Repositório do back-end: [https://github.com/SamuelRicardos/ecommerce-java](https://github.com/SamuelRicardos/ecommerce-java)

---

## ✨ Funcionalidades

- 📦 Cadastro, edição e exclusão de produtos
- 🔎 Listagem e filtro de produtos por categoria
- 🛒 Carrinho de compras com persistência em localStorage
- 📊 Quantidade dos produtos sincronizada com o estoque do servidor
- 💰 Cálculo automático do total de produtos baseado na disponibilidade em estoque
- 🔐 Login com validação de token JWT
- 📦 Tela de checkout com:
  - Nome do usuário
  - Endereço
  - Método de pagamento
  - Validação de campos
- ✅ Finalização de pedido com limpeza do carrinho e atualização do cabeçalho
- 🔄 Atualização dinâmica do número de itens no header
- 🧩 Integração com API REST (Java Spring Boot)
- 🗃️ Armazenamento no MongoDB

---

## 🧰 Tecnologias Utilizadas

### Front-end
- [Angular 17 (Standalone)](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)

### Back-end
- [Java 17](https://www.oracle.com/br/java/technologies/javase/jdk17-archive-downloads.html)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [MongoDB](https://www.mongodb.com/)

---

## 🚀 Como Rodar o Projeto

### 🔧 Pré-requisitos

- Node.js (v18+)
- Angular CLI
- Java 17
- MongoDB local ou em nuvem

---

### ▶️ Rodando o Front-end (Angular)

```bash
# Clone o repositório
git clone https://github.com/SamuelRicardos/angular-ecommerce.git

# Acesse a pasta do projeto
cd angular-ecommerce

# Instale as dependências
npm install

# Inicie o servidor Angular
ng serve
