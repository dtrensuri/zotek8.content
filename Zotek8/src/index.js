const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initApiRoute } = require('./routes/api');
const sequelize = require('./database/pool');
const db = require("./models/index");


// const config = require('./configs/config.json')[env];
const ct = require('countries-and-timezones');
const moment = require('moment-timezone');
// const { DateTimeFormat } = require('intl')


dotenv.config();


const app = express();
const port = process.env.PORT || 8808;

moment.tz.setDefault(process.env.TZ);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use();

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connected to the database');

//     })
//     .catch((err) => {
//         console.error('Unable to connect to the database:', err);
//     });

db.sequelize.authenticate().then(() => {
    console.log('Connected to the database');
})
    .catch((err) => {
        console.error('Unable to connect to the database:');
    });


app.listen(port, () => {
    console.log('listening on port:' + port + "\n http://localhost:" + port);
});
initApiRoute(app);

