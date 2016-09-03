module.exports = function (mongoose) {

    return mongoose.model('User', {
                id: String,

                name: String,
                password: String,

                authDomain: String,
                email: String
            });

};