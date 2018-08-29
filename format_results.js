exports.format_websites = function(array){
    var final = [];
    var j = 0;
    for(var i = 0; i<array.length; i++){
        //console.log(i);
        tocheck = array[i];
        var match = tocheck.match(/(https:\/\/www\.amazon\.com\/\w+\/\w+\/[a-zA-Z0-9]+)/);
        if(match){//This makes sure we only list values we keep and there are no missing numbers
            final[j] = match[1] + '/ref=tmm_hrd_swatch';
            final[j+1] = match[1] + '/ref=tmm_pap_swatch';//We want hardcover or paperback only
            j+=2;
        }
    }
    return final;
}

remove_duples = function(array){
    var final = [];
    var Product = require('./pre_struct');
    var tocheck = new Product();
    var j = 0;
    for(var i = 0; i<array.length; i++){
        tocheck = array[i];
        var unique = true;
        for(var k = i+1; k<array.length; k++){//This makes sure we only list values we keep and therea re no missing numbers
            if(tocheck.doppelganger(array[k])){
                unique = false;
            }
        }
        if(unique){
            tocheck.set_id(j);
            final[j] = tocheck;
            j++;
        }
    }
    return final;
}

exports.format_products= function(array){//takes in an array of products and drops those with missing values
    var final = [];
    var j = 0;
    var Product = require('./pre_struct');
    var tocheck = new Product();
    for(var i = 0; i<array.length; i++){
        console.log(i);
        tocheck = array[i];
        if(tocheck.check_all()){//This makes sure we only list values we keep and therea re no missing numbers
            tocheck.set_id(j);
            console.log(tocheck.description);
            final[j] = tocheck;
            j++;
        }
    }
    final = remove_duples(final);
    console.log(JSON.stringify(array, undefined, 2));
    console.log(JSON.stringify(final, undefined, 2));
}//This is to make the results look nice and prove I'm not just pulling data out of nowhere