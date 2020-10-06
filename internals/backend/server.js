const express = require('express');

const dataSet = require('./data');

const mainDataSet = dataSet.generateData();

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || null;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/companies', (req, res) => {
    res.send(mainDataSet.companies);
});

app.get('/company/:id/prices', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send([])
    }

    try {
        const companyId = parseInt(id);
        const prices = mainDataSet.companiesPrices.filter(p => p.company === companyId);
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
    res.send(mainDataSet.markets);
});

app.get('/market/:id/prices', (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send([])
    }

    try {
        const marketId = parseInt(id);
        const prices = mainDataSet.marketsPrices.filter(p => p.market === marketId);
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