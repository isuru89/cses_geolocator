module.exports = function (mongoose) {

    return mongoose.model('Company', {                
                companyId: Number,
                companyName: String,

                address: String,

                loc : {
                    type: [Number],
                    index: '2d'
                },

                email: String,
                website: String,

                headOfficeAddress:String,

                createdAt: {type: Date, default: Date.now },
                updatedAt: {type: Date, default: Date.now }
            });

};