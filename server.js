const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();

//api for interating with MongoDB
const api = require('./server/routes/api');

//Parsers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Angular dist output
app.use(express.static(path.join(__dirname, 'dist')));

//api location
app.use('/api', api);

app.get('*', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set the port
const port = process.env.PORT || '3000';
app.set('port', port);

//create server
const server = http.createServer(app);

server.listen(port, ()=>{
  console.log('Running on localhost: '+port);
});
