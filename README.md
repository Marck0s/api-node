>Recomendação. Utilizar extensão: Markdown Preview Enhanced 

>Shortcuts: cmd-k v or ctrl-k v | Open preview to the Side

# Instruções API | L5.networks

## Descrição
API para gerir usuários, incluindo funcionalidades de criação, atualização, listagem e exclusão (soft delete) de usuários, além de upload de imagens.

## Tecnologias utilizadas
- Node.js
- Express
- SQLite
- Multer
- Sharp
- Swagger

## Pré-requisitos
- Node.js v20.15.0 ou superior.
- npm (gerenciador de pacotes do Node.js).

### Repositório GitHub

##### Bash
```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### Instalação
1. Dentro do diretório, execute os caminhos abaixos:

##### Powershell
2. Instale as dependências:
```
npm install
```
### Insomnia
1. Importe a collection no Insomnia.
```
collection-Insomnia.json
```

## Configuração (não obrigatório)
>Caso queira usar o seu próprio certificado SSL, siga os passos abaixo:

1. Crie um diretório para armazenar os certificados SSL:
##### Bash
```
mkdir src/SSL
```
2. Adicione os arquivos de certificado (code.crt) e chave (code.key) no diretório src/SSL. Crie um certificado [aqui](https://pt.rakko.tools/tools/46/).

## Rodando a API
Inicie os servidores [HTTP](http://localhost:3000) e [HTTPS](https://localhost:3001):
```
npm run dev
```

## Documentação da API
A documentação da API pode ser visualizada abaixo:

[Swagger UI](http://localhost:3000/api-docs)
