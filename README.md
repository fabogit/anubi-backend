<p align="center">
  <a href="http://anubidigital.com/" target="blank"><img src="https://anubi-public-assets.s3.eu-central-1.amazonaws.com/ANUBI-LOGO-19-aprile-bianco.png" width="320" alt="Nest Logo" /></a>
</p>

# Anubi Digital coding interview Backend

A simple Nest JS backend implementation to showcase applicants' skills.

## Start the project

`npm install` &&
`npm run start:dev`

Backend

- Paginate the `GET:transactions` endpoint to return 5 elements per page (hint: use the date as index)

`Test GET /transactions/:page` => `http://localhost:3081/v1/transactions/1`

- Implement the `GET:balances` endpoint so to have the current balance for each user and asset

`Test GET /balances/:userId` => `http://localhost:3081/v1/balances/u1`

- Implement the `processUserInterests` method inside the class `AppService`

- Setup a GraphQL endpoint and add a mutation that given a user id, an asset id and a date it will invoke `processUserInterests` method
