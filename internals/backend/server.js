const express = require('express');

const dataSet = require('./data');

const mainDataSet = dataSet.generateData();
console.log(mainDataSet);

console.log(`HOST: ${process.env.HOST}:${process.env.PORT}`);
const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || null;
const app = express();

app.get('/companies', (req, res) => {
    res.send(mainDataSet.companies);
});

app.get('/companies-prices', (req, res) => {
    res.send(
        {msg: 'companies-prices'}
    );
});

app.get('/markets', (req, res) => {
    res.send(mainDataSet.markets);
});

app.get('/markets-prices', (req, res) => {
    res.send(
        {msg: 'markets-prices'}
    );
});

app.listen( PORT, HOST, () => {
    console.log(`listen ${HOST} in port ${PORT}`);
});