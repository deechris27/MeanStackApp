const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure)=>{
  MongoClient.connect('mongodb://localhost:27017/MeanDB', (err, db)=>{
     if(err) return console.log(err);

     closure(db);
  });
};

//Error handling
const sendError = (err, res)=>{
  res.status = 501;
  res.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

router.get('/users', (req, res)=>{
  connection((db) =>{
    db.collection('users').find().toArray().then((users)=>{
        response.data = users;
        res.json(response);
    }).catch((err)=>{
      sendError(err, res);
    });
  });
});

module.exports = router;
