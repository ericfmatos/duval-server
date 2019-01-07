var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var config = require('./config');
var path = require('path');

//var tripletriad = require('../TripleTriad/node/web');

var app = express();
//app.set('port', 8081);
var port =  config.server.port;
app.set('port', port);
/*
app
    .use('/tripletriad', tripletriad.app)
    .listen(8081, function(){
        console.log('Express server listening on port ' + app.get('port'));
      });

tripletriad.start();*/


var webApps = config.apps;

for (var i = 0; i < webApps.length; i++) {
    try {
        var webApp = webApps[i];
        
        if (webApp.path && webApp.alias) {
            if (!webApp.alias.startsWith('/')) {
                webApp.alias = '/' + webApp.alias;
            }
            if (!path.extname(webApp.path)){
                webApp.path += ".js";
            }

            webApp.path  = path.join(__dirname, webApp.path);
            if (fs.existsSync(webApp.path)) {
                
                var webAppJs = require(webApp.path);
                if (webAppJs && webAppJs.app) {
                    app.use(webApp.alias, webAppJs.app);


                    if (webAppJs.start){
                        webAppJs.start();
                    }
                }

            }

        }
    } catch(err) {
        console.log(`could not start webapp ${webApp.alias}: ${err}`);
    }
}

app.use(express.static(path.join(__dirname, 'views')));

app.listen(port, function(){
    console.log('Express server listening on port ' + app.get('port'));
});




require('./router')(app, webApps);