const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const app = require('express')();
const moment = require('moment');

// Fontend route
const FrontMongoRouter = require('./routes/front_mongo');
const FrontPgDbRouter = require('./routes/front_pgdb');

// Set ejs template engine
app.set('view engine', 'ejs');

app.use(bodyParse.urlencoded({extended: false}));
app.locals.moment = moment;

// Database connection
const db = require('./config/keys').mongoProdURI;
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log(`Mongodb Connected`))
.catch(error => console.log(error));

/*
const tracker = require('@middleware.io/node-apm');
tracker.track({
    projectName: "otel-demo",
    serviceName: "mangotodo",
    accessToken: process.env.MW_ACCOUNT_KEY,
});
*/

app.use(FrontMongoRouter);
app.use(FrontPgDbRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});