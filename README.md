# cses_geolocator

## Prerequisites
 * Node.js
   * node version >= `4` and npm version >= `3`
 * Bower
   * install using `npm install -g bower`
 * MongoDB
   * Mongo version >= `3.2`

## How to Run
 1. Start the MongoDB server in default port `27017` and create a database called `geolocator`
 1. run `npm install` to fetch all node dependencies
 2. run `bower install` to fetch all bower dependencies
 3. run `node server.js` to start the server
 4. navigate to `http://localhost:9090` to see the index.html

## Import data to MongoDB
 * `mongoimport.exe -d geolocator -c companies --type csv --file <project-location>\company.csv --headerline`
 
 eg: `mongoimport.exe -d geolocator -c companies --type csv --file C:\Projects\csnes\cses_geolocator\company.csv --headerline`

## Service Operations
  All operations are defined at file [routes.js](app/routes.js)

 * `/api/company/all` - __POST__ - Fetch all companies or returns lists according to the given search criteria
 * `/api/company/:cid` - __GET__ - Get a company by its id
 * `/api/company/add` - __POST__ - Adds a new company to the database
 * `/api/company/edit` - __POST__ - Edits existing information about a company
 * `/api/company/remove/:cid` - __POST__ - Removes a company identified by the given id (`cid`) from database

## Advanced Configurations
 * Setup MongoDB Admin User / DB user Application authentication
   * Start the mongod.exe without --auth
   * Start mongo.exe
   * `use admin`
   * `db.createUser({user: "myUserAdmin", pwd: "abc123",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})`
   * `use geolocator`
   * `db.createUser({user: "myTester",pwd: "xyz123",roles: [{role: "readWrite", db: "test" }]})`
   * Restart mongod.exe with --auth
   * Change config/db.js
   * `url : 'mongodb://myTester:xyz123@localhost:27017/geolocator'`
