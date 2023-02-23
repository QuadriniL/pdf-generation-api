# :page_facing_up:PDF GENERATION API
Este repositório contém uma API REST que permite gerar arquivos a partir de um template JSON enviado na rota `/generate`. O aplicativo espera um JSON com os campos `template: string` e `properties: object`, e retorna o caminho do arquivo gerado como uma string.

## Requisitos
- Node.js
- npm ou pnpm

## Instalação
- Clone o repositório para sua máquina local.
- Execute npm install ou yarn install para instalar as dependências.
- Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

#### .env
```
PORT=3000
```

- Execute npm start ou yarn start para iniciar o servidor.

## Utilização
A API possui um único endpoint /generate, que espera um JSON com os campos "template" e "properties". O campo "template" deve ser uma string contendo o conteúdo do template a ser utilizado para gerar o arquivo, enquanto o campo "properties" deve ser um objeto contendo as variáveis a serem utilizadas no template.

Exemplo de JSON a ser enviado via POST:
```json
{
  "template": "<p>{{content}}</p>",
  "properties": {
    "content": "Meu conteúdo"
  }
}
```

A resposta da API será um JSON contendo o campo "path", que indica o caminho do arquivo gerado.

Exemplo de resposta:

```json
{
  "path": "/path/to/generated/file.pdf"
}
```

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.
