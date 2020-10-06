const express = require('express');

const dataSet = require('./data');

const dataSource = {
    mainDataSet: {},
}

dataSource.mainDataSet = dataSet.generateData();

const getCompanies = () => {
    return dataSource.mainDataSet.companies;
}

const getCompaniesPrices = () => {
    return dataSource.mainDataSet.companiesPrices;
}

const getMarkets = () => {
    return dataSource.mainDataSet.markets;
}

const getMarketsPrices = () => {
    return dataSource.mainDataSet.marketsPrices;
}

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || null;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/update', (req, res) => {
    dataSource.mainDataSet = dataSet.generateData();
    res.send({status: 'success'});
});

app.get('/companies', (req, res) => {
    res.send(getCompanies());
});

app.get('/company/:id/prices', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send([])
    }

    try {
        const companyId = parseInt(id);
        const rawPrices = getCompaniesPrices();
        const prices = rawPrices.filter(p => p.company === companyId);
        if (prices && Array.isArray(prices)) {
            res.send(prices[0]);
        } else {
            throw new Error('not found');
        }
    } catch (e) {
        res.send(undefined)
    }
});

app.get('/markets', (req, res) => {
    res.send(getMarkets());
});

app.get('/market/:id/prices', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send([])
    }

    try {
        const marketId = parseInt(id);
        const rawPrices = getMarketsPrices();
        const prices = rawPrices.filter(p => p.market === marketId);
        if (prices && Array.isArray(prices)) {
            res.send(prices[0]);
        } else {
            throw new Error('not found');
        }
    } catch (e) {
        res.send(undefined)
    }
});

app.listen( PORT, HOST, () => {
    console.log(`listen ${HOST} in port ${PORT}`);
});