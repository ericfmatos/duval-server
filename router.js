var HomeController = require('./controllers/HomeController');

module.exports = function(app, webApps){

    var currentLocalWebApps = webApps;
    


    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);

    app.get('/', HomeController.Index);

    app.get('/apps', function(request, response) {
    
        var result = currentLocalWebApps.map(function(webApp){
            var webApp = { "name": webApp.name, "path": webApp.alias };
            if (!webApp.path.startsWith(".")) {
                webApp.path = "." + webApp.path;
            }
            return webApp;
        });

        response.json(result);
    });
};

