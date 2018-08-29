exports.findURL = function(main_address, lineup, search1, search2){
    var cookies;
    var coffee = lineup.match(search1);
    var validUrl = require('valid-url');
    if(coffee){
        var tea = [];
        for(var i = 0; i<coffee.length; i++){
            var cappuccino = coffee[i].match(search2);
            if(cappuccino){
                tea.push(cappuccino[1]);
            }
        }
        cookies = [];
        for(var i = 0; i<tea.length; i++){
            var suspect = tea[i];
            var target = main_address+suspect;
            if (validUrl.isUri(target)){
                cookies.push(target);
            }
        }
    } else {
        console.log("No matches!");
    }
    return cookies;
};

multi_regex = function(string, regex_set){
    var str_match;
    for(var i = 0; i<regex_set.length; i++){
        match = string.match(regex_set[i]);
        if(match){
            str_match = match;
            break;
        }
    }
    return str_match;
};
multi_multi_regex = function(string, reg_arr){
    var set  = [];
    for(var i = 0; i<reg_arr.size; i++){
        var temp = multi_regex(string, reg_arr[i]);
        console.log(temp);
        if(temp){set[i] = temp[1];}
    }
    return set;
};

exports.getinfo = function(string, source, count){
    var Product = require('./pre_struct');
    var test1 = new Product();
    var id = count;
    var regex_array = [
        [
            /<span id="productTitle" class="a-size-large">([^<]+)<\/span>/, 
            /<meta name="title" content="([^":]+:[^":]+)/
        ],
        [
            /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<span class="a-size-small a-color-price">\s*(\$[\d]+\.[\d]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/,
            /<div class="a-fixed-right-grid-col a-col-left" style="padding-right:2\.5%;float:left;">\s*<a class="a-link-normal" href="[^"]+">\s*<span class="a-size-small a-color-price">\s*(\$[\d]+\.[\d]+)\s*<\/span>\s*<\/div>\s*<div class="a-fixed-right-grid-col a-col-right" style="width:50px;margin-right:-50px;float:left;">/
        ],
        [
            /<li><b>\s+Product Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/,
            /<li><b>\s+Package Dimensions:\s+<\/b>\s+(.+)\s+<\/li>/
        ],
        [
            /imageGalleryData' : \[({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"},)*({"mainUrl":"[^"]+","dimensions":\[[^\]]+\],"thumbUrl":"[^"]+"})\]/
        ],
        [
            /<li><b>Shipping Weight:<\/b>\s+([\d]+[\.]?[\d]{0,2} \w+)/,
            /<li><b>Package Weight:<\/b>\s+([\d]+[\.]?[\d]{0,2} \w+)/
        ]
    ];
    var descrip_regex = [
        /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|&|;|#|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<p>/,
        /<noscript>\s*<div>\s*<p>([\w|\s|\.|'|\-|,|:|(|)|;|&|;|#|\!|’|<b>|<\/b>||<i>|<\/i><u>|<\/u>|\?|…]+)<\/p>/,
        /<meta name="description" content="([^"]+)"\s+\/>/
    ];
    if(string){
        var set = [id];
        var set2 = multi_multi_regex(string, regex_array);
        set.push(set2);
        set[6] = source;
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
        var desc;
        for(var i = 0; i<descrip_regex; i++){//This is different than mass_regex, because we only need one result
            desc = string.match(descrip_regex[i]);
            if(desc){break;}
        }
        set[7] = desc;
        test1.set_all(set);
        //console.log(JSON.stringify(test1, undefined, 2));
        return test1;
    }
    else{
        console.log('No input.');
    }
}