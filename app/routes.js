var path = require('path');

module.exports = function (app, configs) {

    var Models = require('./models')(configs);

    app.post("/api/company/all", function (req, res) {
        Models.Company.find({ }, function (err, company) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(company);
        });
    });

    app.get("/api/company/:cid", function (req, res) {
        Models.Company.findOne({ 'id': req.params.cid }, function (err, company) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(company);
        });
    });

    app.post('/api/company/add', function (req, res) {
        var company_data = req.body;
        company_data.createdAt = Date.now();

        Models.Company.create(company_data, function (err, addedCompany) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(addedCompany);
        });

    });

    app.post('/api/company/remove/:cid', function (req, res) {
        var cid = req.params.cid;
        Models.Company.remove({ 'id': cid }, function (err) {
            if (err) {
                res.status(500).send("No document by id " + cid + " to remove!");
            }
            
            res.json({ removed: true });
        });
    });

    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load our public/index.html file
    });

};