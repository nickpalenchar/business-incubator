/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var BusinessUser = Promise.promisifyAll(mongoose.model('BusinessUser'));
var ConsumerUser = Promise.promisifyAll(mongoose.model('ConsumerUser'));

// ConsumerUser.create(
//     {
//         name: 'Tom',
//         email: 'tom@issharing@io',
//         interests: ['Coding', 'Understanding'],
//         address: '5 Hanover Sq'
//     }
// );

var seedBusinessUsers = function () {
    var businessUsers = [
        {
            name: 'Gordon',
            email: 'gordon@yallstreet.com',
            businessType: 'restaurant',
            businessAddress: '30 Wall St',
            pitch: 'Will trade muffins for pot',
            interests: ['Leisurely walks in parks', 'Indian Food'],
        }
    ];
    return BusinessUser.createAsync(businessUsers);
};


var seedConsumerUsers = function () {
    var consumerUsers = [
        {
            name: 'Tom',
            email: 'tom@issharing@io',
            interests: ['Coding', 'Understanding'],
            address: '5 Hanover Sq'
        }
    ];
    return ConsumerUser.createAsync(consumerUsers);
}


connectToDb.then(function () {
    ConsumerUser.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedConsumerUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
