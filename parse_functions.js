exports.findURL = function(main_address, lineup, search1, search2){
    var cookies = [];
    console.log(lineup);
    console.log(search1);
    var coffee = lineup.match(search1);
    var validUrl = require('valid-url');
    if(coffee){
        //console.log(coffee);
        var tea = [];
        for(var i = 0; i<coffee.length; i++){
            var cappuccino = coffee[i].match(search2);
            if(cappuccino){
                tea.push(cappuccino[1]);
            }
        }
        for(var i = 0; i<tea.length; i++){
            var suspect = tea[i];
            var target = main_address+suspect;
            if (validUrl.isUri(target)){
               // console.log(target);
               // console.log('Looks like an URL');
                cookies.push(target);
                //console.log(cookies.length);
            } else {
                console.log('Not a URL');
            }
        }
    } else {
        console.log("No matches!");
    }
    console.log(cookies);
    return cookies;
};

mass_regex = function(id, input, regex_array, source){//execute a series of regex on a piece of text
    var toRet = [id];
    for(var i = 1; i<regex_array.length+1; i++){
        var a = input.match(regex_array[i-1]);
        if(a){
            if(a.constructor === Array){
                if(a.length == 2){
                    toRet[i] = a[1];
                }
                else{
                    toRet[i] = a;
                }
            }
            else {
                toRet[i] = a;
            }
        } else {
            toRet[i] = null;
        }
    }
    toRet[toRet.length] = source;
    return toRet;
}

exports.getinfo = function(string, source, count){
    var Product = require('./pre_struct');
    var test1 = new Product();
    var id = count;
    var regex_array = [/<span id="productTitle" class="a-size-large">([^<]+)<\/span>/,
    /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<span class="a-size-small a-color-price">\s*(\$[\d]+\.[\d]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/,
        /<li><b>\s+Product Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/,
    /imageGalleryData' : \[({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"},)*({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"})\]/,
    /<li><b>Shipping Weight:<\/b>\s+([\d]+[\.]?[\d]{0,2} \w+)/
    ];
    var descrip_regex = [
        /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|&|;|#|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<p>/,
        /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|&|;|#|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<\/p>/,
        /<meta name="description" content="([^"]+)"\s+\/>/
    ];
    //id, name, listprice, description1, description2, product dimension, imageurls, weight, sourceurl
    if(string){
        var set = mass_regex(id, string, regex_array, source);
        var gallery = set[4];
        if(gallery){
            var imageset = gallery[0].match(/\{"mainUrl":"([^"]+)","dimensions":\[[^\]]+\],"thumbUrl"/g);
            if(imageset){
                for(var i = 0; i<imageset.length; i++){
                    imageset[i] = imageset[i].match(/\{"mainUrl":"([^"]+)","dimensions":\[[^\]]+\],"thumbUrl"/)[1];
                }
                set[4] = imageset;
            }
        } 
        //id, name, listprice, description1, description2, product dimension, imageurls, weight, sourceurl
        test1.set_all(set);
        var desc = string.match(descrip_regex[2]);
        if(desc){
            test1.set_description(desc[1]);
        }
        console.log(JSON.stringify(test1, undefined, 2));
        return test1;
    }
    else{
        console.log('No input.');
    }
}