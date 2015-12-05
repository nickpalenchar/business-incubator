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
    businessType: {
        type: String,
        required: true
    },
    pitch: {
        type: String,
        required: true
    },
    // address will be generated from gmaps
    businessAddress: {
        type: String
    },
    // location{ lat: NUMBER, lng: NUMBER } will be generated pre-save if address exists
    businessLocation: {
        type: Object
    }
});

// if location exists, generate & store geocode
schema.pre('save', function (next) {
    if (!this.address) return next();
    var self = this;
    geocoder.geocode(this.address, function(err, data) {
        self.location = data.results[0].geometry.location;
        next();
    });
});

mongoose.model('BusinessUser', schema);
