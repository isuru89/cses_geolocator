var mongoose = require('mongoose');

module.exports = function (configs) {

    mongoose.connect(configs.url);

    return {
        Company: require('./Company')(mongoose)
        
    };
    
};