const express = require('express');
const app = express();
// const bodyParser = require('body-parser');

const assignment = require('./routers/assignment');
// only require db.js if you want to connect to the database
const db = require('./db');

// app.use(bodyParser.json());
app.use(express.json());
app.use('/auth', assignment)
// app.get


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})