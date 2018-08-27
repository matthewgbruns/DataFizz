/*
search_and_destroy = function (entry, t1, t2){
    var http = require('http');
    var dt = require('./print_functions');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", entry);
    xhttp.responseType = "document";
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                var parser = require('./parse_functions');
                var temp = xhttp.responseText;
                console.log(temp);
                parser.findURL(entry, temp, t1, t2);
            }
        }
    };
    xhttp.send();
}

var narrow_down = /"[^"]+","url":"[^"]+"/;
var search_for_booksite= /"Books","url":"([^"]+)"/;
var search_for_books = /<a class="a-link-normal" title="([^"]+)" href="([^"]+)"/g;
search_and_destroy('https://amazon.com', narrow_down, search_for_booksite);
*/
tester = function(baseweb, filters, count){
    var http = require('http');
    var dt = require('./print_functions');
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    console.log(baseweb);
    xhttp.open("GET", baseweb);
    xhttp.responseType = "document";
    /*
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                console.log(xhttp.responseText);
            }
        }
    };
    */
    xhttp.send();
    xhttp.onload = function () {
        if (xhttp.readyState === xhttp.DONE) {
            if (xhttp.status === 200) {
                var parser = require('./parse_functions');
                var temp = xhttp.responseText;
                var result = parser.findURL("https://www.amazon.com", temp, filters[count][0], filters[count][1]);
                if(count == 0){
                    for(var i = 0; i<result.length; i++){
                        console.log(result[i]);
                    } 
                    return result;
                }
                return tester(result, filters, count-1);
            }
        }
    };
};

  var sequentialStart = function() {
    var baseweb = "https://www.amazon.com";
    var narrow_down = /"[^"]+","url":"[^"]+"/g;
    var search_for_booksite= /"Books","url":"([^"]+)"/;
    var search_titles = /<a class="a-link-normal" title="[^"]+" href="[^"]+"/g;
    var any =  /<a class="a-link-normal" title="[^"]+" href="([^"]+)"/;
    var filterarray = [[search_titles, any], [narrow_down, search_for_booksite]];
    tester(baseweb, filterarray, filterarray.length-1) // If the value of the expression following the await operator is not a Promise, it's converted to a resolved Promise.
    //return test1;
  }
  var sequentialStart2 = async function(test1){
    
    let resultb = await testertype1(test1, search_titles,);
    return resultb;
  }
  //var ab = sequentialStart();
  //var ba = sequentialStart2(ab[0]);
  //if(resultb !== undefined){
  //  for(var r in resultb){
  //        console.log(r);
  //    }
  //}

  var parser = require('./parse_functions');
  parser.getinfo();