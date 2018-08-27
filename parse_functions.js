exports.findURL = function(main_address, lineup, search1, search2){
    var cookies = [];
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
    //console.log(cookies);
    ISDONE = true;
    return cookies;
};

exports.getinfo = function(){
  var string = ``
var Product = require('./pre_struct');
var test1 = new Product();
//<span id="productTitle" class="a-size-large">Sushi at Home: A Mat-To-Table Sushi Cookbook</span>
var regexProdTitle = /<span id="productTitle" class="a-size-large">([^<]+)<\/span>/;
var prodTitle = string.match(regexProdTitle);
if(prodtitle){
    test1.set_name(prodTitle);
}
var regexListPrice = /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<span class="a-size-small a-color-price">\s*(\$[0-9]+\.[0-9]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/;
var listPrice = string.match(regexListPrice);
if(listPrice){
    test1.set_listPrice(listPrice);
}
var regexDescription1 = /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<p>?([\w|\s|\.|'|\-|,|:|(|)|;|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<p>/;
var regexDescription2 = /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<\/p>/;//Apparently there are at least two ways this can happen and these cases account for most of them
var description1 = string.match(regexDescription1);
var description2 = string.match(regexDescription2);
if(description1){
    test1.set_description(description1);
}else{
    if(description2){
        test1.set_description(description2);
    }
}
var regexDimensions = /<li><b>\s+Product Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/;
var dimensions = string.match(regexDimensions);
if(dimensions){
    test1.set_product_dimension(dimensions);
}
var regexGallery = /imageGalleryData' : \[({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"},)*({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"})\]/;
var regexImages = /\{"mainUrl":"([^"]+)","dimensions":\[[^\]]+\],"thumbUrl"/g;
var images = [];
var gallery = string.match(regexGallery);
if(gallery){
    var set = gallery[0].match(regexImages);
    if(set){
        for(var i = 0; i<set.length; i++){
            images.push(set[i]);
        }
    }
}
console.log(JSON.stringify(test1, undefined, 2));
}