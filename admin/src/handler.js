const config = require("config")
const request = require("request")

// TODO refactor function
const generateReport = (req, res) => getInvestments()
    .then((investmentResp) => {
        handleError(investmentResp, res.send)
        return getCompanyList()
            .then(companies => {
                handleError(companies, res.send)
                const csvReport = formatInvestments(investmentResp.response, formatCompanies(companies.response))
                return sendExportToInvestments(csvReport)
                    .then(serviceRepsonse => {
                        handleError(serviceRepsonse, res.send)
                    })
                    .then(() => res.send(csvReport))
            })
    })

const getInvestmentById = (req, res) => {
    const { id } = req.params
    request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
        if (e) {
            console.error(e)
            res.send(500)
        } else {
            res.send(investments)
        }
    })
}

/**
 * Function to handle error resposne
 * TODO - error handling to be done properly
 * @param {Object: {status: number, response: any}} resp 
 * @param {Function} send 
 */
const handleError = (resp, send) => {
    if (![200, 204].includes(resp.status)) {
        send(resp.response ? resp.response : null).status(resp.status)
    }
}

/**
 * Function to send formatted csv to investment service
 * TODO - could create function for string validation for csv format?
 * @param {string} exportString 
 * @returns void
 */
const sendExportToInvestments = exportString => new Promise((res) => request
    .post(`${config.investmentsServiceUrl}/investments`, {
        body: exportString
    }, (e) => e ?
        res(formatResponse(500, e)) :
        res(formatResponse(200, null))
    ))

/**
* Function to get all investments
* @returns Object {status: number, response: error | Investment json}
*/
const getInvestments = () => new Promise((res) => request
    .get(`${config.investmentsServiceUrl}/investments`, (e, _, investments) => e ?
        res(formatResponse(500, e)) :
        res(formatResponse(200, investments))
    ))

/**
 *  Function to retriev a list of companies from the financial companies service
 * @returns Array<Companies>
 */
const getCompanyList = () => new Promise((res) => request
    .get(`${config.financialCompaniesServiceUrl}/companies`, (e, _, companies) => e ?
        res(formatResponse(500, e)) :
        res(formatResponse(200, companies))
    ))

/**
 * Function to format a list of companies into a company key map for reusability
 * @param {Array<Companies>} companies 
 * @returns Object<{[id: string]: string}>
 */
const formatCompanies = companies => {
    const companiesJson = JSON.parse(companies)
    const keyCompanyMap = {}
    companiesJson.forEach(company => {
        keyCompanyMap[company.id] = company.name
    })
    return keyCompanyMap
}

/**
 * Function that formats the investments into csv
 * @param {Array<Investments>} investments 
 * @param {Object<{[key: string]: string}>} companyKeyMap 
 * @returns string
 */
const formatInvestments = (investments, companyKeyMap) => {
    const invJson = JSON.parse(investments)
    let csv = `|User|First Name|Last Name|Date|Holding|Value|\n`
    invJson.forEach(inv => {
        inv.holdings.forEach(holding => {
            csv = `${csv}|${inv.userId}|${inv.firstName}|${inv.lastName}|${inv.date}|${companyKeyMap[holding.id]}|${calculateHoldingValue(inv.investmentTotal, holding.investmentPercentage)}|\n`
        })
    })
    return csv
}

// helper function that calculates the total holding value
const calculateHoldingValue = (total, percentage) => `${total * percentage}`

/**
 * Function to format response
 * @param {number} status 
 * @param {any} response 
 * @returns {status: number, response: any}
 */
const formatResponse = (status, response) => ({
    status,
    response: response ? response : null
})

exports.generateReport = generateReport
exports.getInvestmentById = getInvestmentById