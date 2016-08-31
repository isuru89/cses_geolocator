module.exports = function (mongoose) {

    return mongoose.model('Company', {
                id: String,
                name: String,

                address: String,

                loc : {
                    type: [Number],
                    index: '2d'
                },

                createdAt: {type: Date, default: Date.now },
                updatedAt: {type: Date, default: Date.now }
            });

};