const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const MOCK_DIR = path.resolve(__dirname, '../', 'jsonserver');
const config = require('./mock-config');
const JSONServer = jsonServer.create();
const middleWares = jsonServer.defaults();
const walk = dir => {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        }
        else if (path.extname(file) === '.json') {
            results.push(file);
        }
    });
    return results;
};
const files = walk(MOCK_DIR);
let db = {};
files.forEach(function (file) {
    Object.assign(db, require(path.resolve(MOCK_DIR, file)));
});
JSONServer.use(middleWares);
JSONServer.use(jsonServer.rewriter(config.router));

JSONServer.use(jsonServer.bodyParser);
JSONServer.use(function (req, res, next) {
    if (req.method === 'POST') {
        // Converts POST to GET and move payload to query params
        // This way it will make JSON Server that it's GET request
        req.method = 'GET';
        req.query = req.body;
    }
    // Continue to JSON Server router
    next();
});

JSONServer.use(jsonServer.router(db));
JSONServer.listen(config.mockPort, function () {
    console.log(`JSON Server is running on:${config.mockPort}`);
});