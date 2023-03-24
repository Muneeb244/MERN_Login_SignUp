const express = require('express');
const app = express();

const assignment = require('./routers/assignment');
// only require db.js if you want to connect to the database
const db = require('./db');

app.use(express.json());
app.use('/auth', assignment)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})