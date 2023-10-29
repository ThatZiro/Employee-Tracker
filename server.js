const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const apiRoute = require('./routes/db');
app.use('/db', dbRoute);

app.listen(PORT, () => {
    console.log('Server Running');
})