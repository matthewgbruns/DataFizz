    scraper = function(baseweb, filters, count){
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", baseweb);
        xhttp.responseType = "document";
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    var parser = require('./parse_functions');
                    var temp = xhttp.responseText;
                    var result = parser.findURL(baseweb, temp, filters[count][0], filters[count][1]);
                    if(!result){
                        console.log('Could not scrape site. Aborting.');
                        return;
                    }
                    if(count == 0){
                        console.log('Site scraped. Converting to JSON.');
                        return site_to_JSON(result, result.length, []);
                    }
                    console.log();
                    return scraper(result, filters, count-1);
                }
            }
        };
    };

    site_to_JSON = function(baseweb, count, array){
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", baseweb[count-1]);
        xhttp.responseType = "document";
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    var parser = require('./parse_functions');
                    count--;
                    var add = parser.getinfo(xhttp.responseText, baseweb[count], count);
                    array[count] = add;
                    if(count == 0){
                        var formatter = require('./format_results');
                        console.log('Formatting...');
                        formatter.format_products(array);
                        return;
                    }else{
                        return site_to_JSON(baseweb, count, array);
                    }
                }
            }
        };
    };
main = function(){
    var baseweb = process.argv[2];
    var filterarray;
    switch(process.argv[3]){
        case 'books':
            var narrow_down = /"[^"]+","url":"[^"]+"/g;
            var search_for_booksite= /"Books","url":"([^"]+)"/;
            var search_titles = /<a class="a-link-normal" title="[^"]+" href="[^"]+"/g;
            var any =  /<a class="a-link-normal" title="[^"]+" href="([^"]+)"/;
            filterarray = [[search_titles, any], [narrow_down, search_for_booksite]];
            break;
        default:
            console.log('No search target.');
            return;
    }
    if(!baseweb | !filterarray){
        console.log('Invalid arguments.');
        return;
    }
    console.log('Arguments' + process.argv[2] + ' and ' + process.argv[3] + ' accepted.');
    console.log('Searching ' + process.argv[2] + ' for ' + filterarray);
    scraper(baseweb, filterarray, filterarray.length-1);
}
main();