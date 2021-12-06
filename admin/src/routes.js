const {
    generateReport,
    getInvestmentById
  } = require("./handler")

const routes = {
    "/investments/report": {
        method: 'get',
        handler: generateReport
    },
    "/investments/:id": {
        method: 'get',
        handler: getInvestmentById
    }
}

const handlerRoutes = (app) => {
    Object.keys(routes).forEach(r => {
        const route = routes[r]
        app[route.method](r, (req, res) => route.handler(req, res))
    })
}

exports.handlerRoutes = handlerRoutes