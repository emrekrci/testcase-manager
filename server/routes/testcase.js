const express  =require('express');

const testcaseRoutes = express.Router();

const dbo = require('../db/conn');

testcaseRoutes.route('/testcases').get(async function(_req, res) {
    const dbConnection = dbo.getDB();

    dbConnection.collection('testcases').find({}).toArray(function (err, result) {
        if(err){
            res.status(400).send('ERror fetching testcases');
        }else{
            res.json(result);
        }
    });
});

testcaseRoutes.route("/testcase/add").post(function (req, res){
    const dbConnect = dbo.getDB();
    const matchDocument = {
        name: req.body.name,
        creationDate : new Date(),
        steps : req.body.steps,
    };

    dbConnect.collection('testcases').insertOne(matchDocument, function(err, result){
        if (err) {
            res.status(400).send('Error inserting matches!');
        }else{
            console.log(`New test case has been added with id: ${result.insertedId}`);
            res.status(204).send();
        }
    });
});

testcaseRoutes.route("/testcase/update").post(function (req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const dbConnect = dbo.getDB();
    const testcase = {_id: ObjectId(req.body.id)};
    const updates = {
        $set: {
        name: req.body.name,
        steps: req.body.steps,
        }
        
    };

    dbConnect.collection('testcases').updateOne(testcase, updates, function(err, result){
        if(err) {
            res.status(400).send(`Error updating testcase id is: ${testcase._id}`);
            console.error(err);
        }else{
            res.status(202).send(result);
            console.log("test case has been updated");
        }
    })
})

testcaseRoutes.route("/testcase/delete").post(function(req, res){
    var ObjectId = require('mongodb').ObjectId;
    const dbConnect = dbo.getDB();
    const testcase = {_id: ObjectId(req.body.id)};
    
    dbConnect.collection('testcases').deleteOne(testcase, function(err,result) {
        if (err) {
            res.status(400).send(`Error while deleting data id is: ${testcase._id}`);
            console.error(err);
        } else {
            res.status(202).send(result);
            console.log('successfull deleted item');
        }
    })
})

module.exports = testcaseRoutes;