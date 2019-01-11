const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {useCreateIndex: true, useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('error connected',err));

app.use('/api',routes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listenning on port ${PORT}`));