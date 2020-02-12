# Deal Making API

Task:

develop a simple workflow that can be used to represent a financial asset marketplace transaction using either Typescript or vanilla NodeJS.

### Approach:

My first major decision was how to store the data for this soluton. First, the requirements of parties, deals, and bids just seemed natuaral for a SQL database. I chose SQLite because it is easy to set up and can be installed from NPM and included in package.json. This makes it easy for a project like this to be sent and installed without any complex data setup on the backend. All data is dummy data and will be created on appliction start. The databse is run in-memory so there is no file stroage.

I used a Sequelize ORM for ease of development and to meet the requirement of using and providing objects.

Finally, express was used to create the rest api.

The data for parties deals and bids was kept to a minimum to complete the assignment but can be elaborated on for additional functionallity. In particular, I would probably add a qty field to deals to represent shares amounts and expand bids by adding qty and number of shares.

### Install

```
npm install
```

### Usage

Start application:

This command will create the db and db tables in memory, seed dummy data, and start the express application

```
npm run start
```

## Routes

### Parties Route

GET localhost:3000/api/parties

this route gets a list of all parties

example:

```
curl --location --request GET 'http://localhost:3000/api/parties'
```

GET localhost:3000/api/parties/:id
this route returns information on a specific party

example:

```
curl --location --request GET 'http://localhost:3000/api/parties/2'
```

\*\*\* note: no authentication is set up, but a production enviroment should require authentication and authorization.

### Deals Route

GET localhost:3000/api/deals

this route gets a list of all deals

example:

```
curl --location --request GET 'http://localhost:3000/api/deals'
```

GET localhost:3000/api/deals/:id

this route returns information on a specific deal

example:

```
curl --location --request GET 'http://localhost:3000/api/deals/2'
```

POST localhost:3000/api/deals

this route creates a new deal

the body of the post should contain:
partyId (id number of party creating the deal)
asset (name of the asset being sold)

example:

```
curl --location --request POST 'http://localhost:3000/api/deals/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'partyId=4' \
--data-urlencode 'asset=test-asset'
```

\*\*\* note: info was kept minimal for this exercise but a real deal would have many more details and/or features.

PUT localhost:3000/api/deals/:id

this route updates a specific deal

the body of the route should contain:
partyId (id number of party modfiying the deal)
status (the status of the deal: 'open', 'closed', 'cancelled')

example:

```
curl --location --request PUT 'http://localhost:3000/api/deals/1' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'partyId=1' \
--data-urlencode 'status=closed'
```

\*\*\* note: the partyId in the body of the PUT must match the partyId of the deal object. Only owner of the deal can close the deal.

\*\*\* note: closing a deal will accept the highest bid and reject all other bids in the status field of the bid.

### Bids Route

GET localhost:3000/api/bids

this route gets a list of all bids

example:

```
curl --location --request GET 'http://localhost:3000/api/bids'
```

GET localhost:3000/api/bids/:id

this route returns information on a specific bid

example:

```
curl --location --request GET 'http://localhost:3000/api/bids/2'
```

POST localhost:3000/api/bid

this route creates a new bid

the body of the post should contain:
partyId (id number of party creating the bid)
amount (the amount of the bid)
dealId (id number of the deal being bid on)

example:

```
curl --location --request POST 'http://localhost:3000/api/bids/' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'partyId=4' \
--data-urlencode 'dealId=2' \
--data-urlencode 'amount=999.99'
```

PUT localhost:3000/api/bid/:id

this route updates a specific bid

the body of the route should contain:
partyId (id number of party modifying the bid)
amount (the new bid amount)

example:

```
curl --location --request PUT 'http://localhost:3000/api/bids/9' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'partyId=2' \
--data-urlencode 'amount=1.00'
```

\*\*\* note: the partyId in the body of the PUT must match the partyId of the bid object. Only owner of the bid can modify it.
