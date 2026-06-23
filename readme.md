## tema
o site foi criado para vender produtos de limpeza, que são essenciais no dia a dia das pessoas.

## publico alvo
Todas as pessoas que precisam de ajuda de produtos de limpeza(todas que vivem em uma casa, praticamente todas que vivem uma vida digna.)

## mapa de página
**home.html**
pagina de apresentação do site
**produtos.html**
catalogo bem simples de produtos
**pedidos.html**
formulario para os clientes enviarem os pedidos a serem solicitados e enviados.




<!--
Modificações da Etapa 2

home.html
Inclusão do contador visual de itens no topo da página e chamada do arquivo js/app.js no encerramento do body.

produtos.html
Adicionados os selects de filtro por categoria e ordenação por preço, o container para renderização dinâmica e o script app.js no final.

contato.html
Alterado input de telefone para type tel e adicionados os spans para exibição de erros de validação abaixo dos campos.

js/app.js
Script criado com o array contendo apenas os 3 produtos estruturados (sem metadados de imagem), manipulação de DOM para listagem/filtros/ordenação, persistência do carrinho via localStorage, máscara de telefone em tempo real e interceptação do submit para validação customizada dos campos.
 -->

# diop store - CRUD Pedidos (Etapa 3)

Projeto desenvolvido para a entrega final da Etapa 3. O sistema consiste em uma aplicação web integrada a um banco de dados MySQL via PHP (PDO).

## 📁 O que foi entregue:

* **Banco de Dados (`database.sql`)**: Script de criação do banco `diop_store` e da tabela `pedidos`.
* **Conexão (`/db/conexao.php`)**: Arquivo de conexão estruturada com o MySQL.
* **Inserção (`/actions/criar.php` e `/views/contato.php`)**: Formulário integrado para processar e salvar os dados do cliente via POST com mensagens de feedback.
* **Leitura (`/views/listar.php` e `/views/detalhe.php`)**: Página de listagem geral em tabela e tela de exibição detalhada do registro.
* **Atualização (`/actions/editar.php` e `/views/editar_form.php`)**: Tela e processamento para modificação de dados existentes.
* **Exclusão (`/actions/excluir.php`)**: Remoção definitiva do registro do banco com alerta de confirmação em JavaScript.