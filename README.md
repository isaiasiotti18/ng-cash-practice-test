## Stack
 - NodeJs & Typescript
 - NestJs & Express
 - Typeorm
 - Postgresql
 - Docker

## Endpoints http://localhost:3000/
 - Auth
   - auth/login
 - Users 
   - users/create
   - users/view-balance
 - Transactions
   - transactions/money-transfer
   - transactions/find-transactions?createdAt=''&cashIn=''&cashOut=''

## Como usar

~~~
Rode o comando:
  sudo docker compose up --build -V
~~~

  - Após isso irá subir dois containers um do database e o outro a aplicação
  - O container do database estará rodando na porta 5432
  - E o da aplicação na porta 3000
  - Para testar os endpoints pode acessar o arquivo api.http que se encontra dentro da pasta http
    - Irá precisar adicionar o JWT em algumas rotas, as unicas liberadas são a de auth/login e users/create