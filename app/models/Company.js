module.exports = function (mongoose) {

    return mongoose.model('Company', {
                id: String,
                name: String
            });

};