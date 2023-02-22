# Atak SearchApi

RestAPI desenvolvida como parte do teste realizado para a empresa Atak Sistemas.

## Descrição

RestAPI desenvolvida usando Node.js com TypeScript, onde o objetivo foi desenvolver, em qualquer linguagem, uma API que faz uma pesquisa no Google e devolve o título e link dos resultados em JSON e/ou XML, sem utilizar as APIs do Google, como Search API.

A API faz uso de duas bibliotecas para alcançar seu objetivo: Puppeteer e Cheerio.

Puppeteer é basicamente o que o nome já diz: uma marionete, que permite o usuário manipular instâncias de navegadores, o DOM, e obter dados em massa de qualquer site, interagindo o mais próximo possível como um humano.

Cheerio, é uma biblioteca para manipulação e <i>parsing</i> de HTML e XML.

Iniciei o desenvolvimento com o Puppeteer por já ter familiaridade com a ferramenta graças a outros projetos. Durante minhas pesquisas para realizar o desafio, descobri a existência do Cheerio, e que poderia ser até 3x mais rápido que o Puppeteer, já que o Puppeteer roda uma instância do Chromium para navegar, enquanto o Cheerio não.

Por curiosidade, acabei desenvolvendo o desafio utilizando ambos o Puppeteer e o Cheerio, e esse projeto acabou servindo como um "teste de benchmark" entre os dois. As diferenças nos resultados são bem interessantes.

O desafio foi desenvolvido utilizando o framework Nest.js, e além de fornecer os resultados do Google paginados em JSON para o cliente, também implementei autenticação através de JWT para proteger as rotas da aplicação de usuários sem permissão. Também foram feitos alguns testes de unidade.

O aplicativo em Flutter desenvolvido para servir como cliente para esta API se encontra em: https://github.com/fefsouza10/atak-searchapp, junto de explicações do funcionamento do mesmo.

## Instalação

Clonar o projeto em alguma pasta, e rodar:
```bash
$ npm install
```

## Rodando a aplicação

Após a instalação/download com o comando acima, rodar o seguinte comando:
```bash
$ npm run start
```
O servidor ficará disponível em localhost:3000.
O próximo passo é iniciar o aplicativo em Flutter, encontrado no repositório: https://github.com/fefsouza10/atak-searchapp.

## Testes

Para rodar os testes:
```bash
# unit tests
$ npm run test
```
