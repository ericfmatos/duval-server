var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');

var tripletriad = require('../Triple Triad/node/web');



var app = express();
app.set('port', 8081);

app
    .use('/tripletriad', tripletriad.app)
    .listen(8081, function(){
        console.log('Express server listening on port ' + app.get('port'));
      });

tripletriad.start();