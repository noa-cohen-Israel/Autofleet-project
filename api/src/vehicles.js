'use strict';

var express = require('express');
var router = express.Router();
var pointInPolygon = require('point-in-polygon');

var MongoClient = require('mongodb').MongoClient;
//let jsonData = require('../vehicles-location.json');
let vehiclesdb;


MongoClient.connect("mongodb+srv://autofleet:HFPuyDUs7bDZ4b6q@cluster0.qgblo.mongodb.net/Cluster0?retryWrites=true&w=majority", { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    vehiclesdb = client.db("Cluster0").collection("vehicles");
    //vehiclesdb.insertMany(jsonData)
});

//get all vehicles 
router.get('/', function (req, res) {
    vehiclesdb.find().map(vehicle => {
        return vehicle.location
    }).toArray()
    
        .then(result => {
            res.send(result);
        })
        .catch(error => console.error(error))
});

//Gets points on the map-{lat,lng} and returns the vehicles that are inside the polygon
router.post('/polygon', function (req, res) {
   
    let polygon =req.body.map(location=>{
        return [location.lat,location.lng]
});
let vechileList=[];
    vehiclesdb.find().forEach(vehicle => {
        let location=vehicle.location;
        let p=pointInPolygon([location.lat, location.lng], polygon)
        if (p){   
            vechileList.push(vehicle.id)
        }

    })
    .then( ()=> {
            res.send(vechileList);
    })
    .catch(error => 
        console.error(error))
});
module.exports = router;
