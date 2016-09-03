var path = require('path');
var _ = require('lodash');

var passport = require('passport');

module.exports = function (app, configs) {

    // load all db models
    var Models = require('./models')(configs.db);

    // initialize authentication middleware...
    app.use(passport.initialize());
    app.use(passport.session());

    // load authentication module...
    require('./auth')(passport, app, configs, Models);


    app.post("/api/company/all", function (req, res) {
        var sq = req.body || {}

        Models.Company.find(sq, function (err, company) {
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

    app.post('/api/company/edit', function (req, res) {
        var company_data = req.body;
        if (company_data._ver) {
            delete company_data._ver;
        }

        var id = company_data._id;
        delete company_data._id;
        if (company_data.createdAt) {
            delete company_data.createdAt;
        }
        company_data.updatedAt = Date.now();

        Models.Company.findByIdAndUpdate(id, { $set: company_data}, { new: true }, function (err, company) {
            if (err) {
                res.status(500).send("Update failed of document " + id + "!");
            }
            res.send(company);
        });
    });

    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load our public/index.html file
    });

};

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
