
var Index = function() {


    function loadApps() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './apps');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                if (xhr.responseText) {
                    var data = JSON.parse(xhr.responseText);

                    var el = document.getElementById("webapps");
                    if (el) {

                        for (var i = 0; i < data.length; i++) {
                            var l = data[i];
                            var d =  document.createElement(`li`);
                            d.innerHTML = `<a href="${l.path}">${l.name}</a>`;
                            //var d =  document.createElement(`<li><a href="${l.name}">${l.path}</a></li>`);
                            el.appendChild(d);
                        }
                    }

                    
                }
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        
        xhr.send();
        
    }
    var start = function() {
        loadApps();
    }

    return {
        start
    }
}();

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function(){
    Index.start();
});
