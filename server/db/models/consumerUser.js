'use strict';
var mongoose = require('mongoose'),
    geocoder = require('geocoder');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: Object
    }
});

// generate & store location based on address
schema.pre('save', function (next) {
    var self = this;
    geocoder.geocode(this.address, function(err, data) {
        self.location = data.results[0].geometry.location;
        next();
    });
})

mongoose.model('ConsumerUser', schema);
