   var obj = new Object();
   obj.name = "Raj";
   obj.age  = 32;
   obj.married = false;
   var jsonString= JSON.stringify(obj);
   var data = {
        "data": {
            "x": "1",
            "y": "1",
            "url": "http://url.com"
        },
        "event": "start",
        "show": 1,
        "id": 50
    }
    var jsonString2= JSON.stringify(data);

   //console.log(jsonString);
   //var tester = new XMLHttpRequest();
   //tester.open("GET", "https://google.com");
   //Http.send();
   //console.log(tester.statusText);
    var http = require('http');
    var dt = require('./print_functions');
    /*
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(dt.myJSONPrettyPrinter(jsonString));
        res.end(dt.myJSONPrettyPrinter(jsonString2));
    }).listen(8080);
    */
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.amazon.com/");
    xhttp.responseType = "document";
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                console.log(xhttp.responseText);
            }
        }
    };
    xhttp.send();
    /*
    var http = require('http');
    var dt = require('./print_functions');
    http.createServer(function (req, res) {
        //res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(dt.myJSONPrettyPrinter(jsonString));
        res.end(xhttp.responseText);
    }).listen(8080);
    */
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                var parser = require('./parse_functions');
                var temp = xhttp.responseText;
                //console.log(temp);
                parser.findURL('https://amazon.com', temp);
            }
        }
    };