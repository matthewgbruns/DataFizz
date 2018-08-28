    tester = function(baseweb, filters, count){
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xhttp = new XMLHttpRequest();
        console.log(baseweb);
        xhttp.open("GET", baseweb);
        xhttp.responseType = "document";
        xhttp.send();
        xhttp.onload = function () {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status === 200) {
                    var parser = require('./parse_functions');
                    var temp = xhttp.responseText;
                    var result = parser.findURL("https://www.amazon.com", temp, filters[count][0], filters[count][1]);
                    if(count == 0){
                        return todo(result);
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
        tester(baseweb, filterarray, filterarray.length-1);
    }

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
                        console.log(JSON.stringify(array, undefined, 2));
                        return;
                    }else{
                        return site_to_JSON(baseweb, count, array);
                    }
                }
            }
        };
    };

var fin_array = [];
todo = function(site_array){
/*    site_array = [
        'https://www.amazon.com/Fahrenheit-451-Ray-Bradbury/dp/1451673310/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
        'https://www.amazon.com/Brave-New-World-Aldous-Huxley/dp/0062696122/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
    ]*/
    var arr = [];
    site_to_JSON(site_array, site_array.length, arr) ;
}
sequentialStart();
//todo([
    /*
    'https://www.amazon.com/Fahrenheit-451-Ray-Bradbury/dp/1451673310/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
    'https://www.amazon.com/Brave-New-World-Aldous-Huxley/dp/0062696122/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
    'https://www.amazon.com/Kill-Mockingbird-Slipcased-Harper-Lee/dp/0062428551/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
    'https://www.amazon.com/Mice-Penguin-Great-Books-Century/dp/0812416317/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=',
    'https://www.amazon.com/Lord-Flies-Penguin-Drop-Caps/dp/0143124293/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr='
    */
    //'https://www.amazon.com/Canticle-Leibowitz-Walter-Miller-Jr/dp/0553273817/ref=tmm_mmp_swatch_0?_encoding=UTF8&qid=&sr='
    //'https://www.amazon.com/Kill-Mockingbird-Harper-Lee/dp/0060935464/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr='
//])