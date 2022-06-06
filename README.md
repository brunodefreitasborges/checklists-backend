# Atualizador e Automatizador de Checklists de Frota de Veículos

Parte Back-end da aplicação que automatiza o processo de pesquisar uma placa no website da seguradora e verificar a data de vencimento do checklist.



## Problema

Cada veículo da frota deve realizar um checklist para atestar a funcionalidade das ferramentas de rastreamento - sensores de porta, sirene, bloqueio.
Este checklist possui uma validade de 7 dias e para a seguradora liberar uma viagem o checklist deve estar vigente.

O processo de checagem dos vencimentos é manual pelo site da própria seguradora, por meio de um formulário, informando a placa do veículo - o que acaba se tornando trabalhoso dada a quantidade de placas.

## Solução

O processo de checagem das placas foi automatizado no próprio navegador, utilizando a biblioteca Puppeteer para manipulação do DOM e interações com os campos de formulário.

Os dados sensíveis como usuário e senha para login na plataforma foram colocados em Enviroment Variables.

Os dados retornados foram então convertidos em JSON e disponibilizados através de um Endpoint.

A página de Front-end faz a requisição por API e traz os dados de vencimento de checklist diretamente para a tela. 

## Back-End

NodeJS roda o script do Puppeteer utilizando Chrome-AWS-Lambda, o que agiliza o processo de scraping e diminui o tamanho do arquivo.
Uma rota é criada usando Express, com a possibilidade de especificar a placa a ser pesquisada via query.
Por fim, o endpoint da API foi hospedado na Netlify - em uma função serverless.

## Front-End

ReactJS - cada Placa de veículo é passada por Props no componente. 
Cada componente faz seu Fetch na API e retorna o valor contido no JSON para o state, que é então exibido na tela.
As funções de Fetch são rodadas uma única vez ao iniciar a aplicação, mas podem ser invocadas novamente, caso preciso de algum dado mais atualizado.
