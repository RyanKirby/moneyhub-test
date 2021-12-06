# Moneyhub Tech Test - Investments and Holdings

## Test Tech Updates

Notes: I spent about 3 hours on the test - however this did include some time spent reading into the suggested approaches to the test.

I tried to adopt functional methadologies, however have limited experience ever implementing function code, so I feel the implemntation may be slightly weak. 

I also did not use `Ramda.js` (though I did read through the docs) or unfortunately impement unit test - mainly down to time.

It's been a little while since I have worked in Node, and also in particular vanilla JS, which slowed me down a little more. 

But, this is what I came up with! :) I very much enjoyed completing the technical test. Thanks! 

Install dependencies in each service - `nmp i`

Please spin up the environments from main directory:
- `cd investments; npm run start`
- `cd financial-companies; npm run start`
- `cd admin; npm run develop` (or start)

Once all the services are running, please trigger the following url:
GET `http://localhost:8083/investments/report`

Main work donee:
- Refactor of index.js
- `routes.js` added to handle the routing logic
- `handler.js` added to handle implementation/logic
- New GET route added `investments/report` which should return a csv formatted list of holdings.

Improvments
- Unit and intergration tests (Add mocking to the dependancy services for testing purposes in intergrations)
- Refactor to use proper Functional methodologies (something I would need to research some more, due to lack of experience)
- Authenticate the sepereate services with JWT tokens potentially
- Add some scripts or makefile to install all dependencies and spin up seperate services with one terminal command
- Potentially dockerise the environments - to help with testing and for CI/CD

## Technical Test Introduction

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
