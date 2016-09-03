module.exports = {

    admin: {
        name: 'admin',

        password: 'admin123',
        email: 'admin@csnes.edu'
    },

    'google': {
        clientID      : 'your-secret-clientID-here',
        clientSecret  : 'your-client-secret-here',
        callbackURL   : 'http://localhost:9090/api/auth/callback/google'
    },

    'linkedin': {
        consumerKey: 'LINKEDIN_API_KEY',
        consumerSecret: 'LINKEDIN_SECRET_KEY',
        callbackURL: "http://localhost:9090/api/auth/callback/linkedin"
    }

}