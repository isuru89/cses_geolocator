

module.exports = function (app, configs) {

    var Models = require('./models')(configs);

    app.post("/company/all", function (req, res) {
        Models.Company.find({ }, function (err, company) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(company);
        });
    });

    app.get("/company/:cid", function (req, res) {
        Models.Company.findOne({ 'id': req.params.cid }, function (err, company) {
            if (err) {
                res.status(500).send(err);
            }

            res.json(company);
        });
    });

    app.post('/company/add', function (req, res) {
        var company_data = req.body;
        Models.Company.create(company_data, function (err, addedCompany) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(addedCompany);
        });

    });

    app.post('/company/remove/:cid', function (req, res) {
        var cid = req.params.cid;
        Models.Company.remove({ 'id': cid }, function (err) {
            if (err) {
                res.status(500).send("No document by id " + cid + " to remove!");
            }
            
            res.json({ removed: true });
        });
    });

};