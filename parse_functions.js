exports.findURL = function(main_address, lineup){
    var searchregex = /"[^"]+","url":"([^"]+)"/g;
    var coffee = lineup.match(searchregex)
    var validUrl = require('valid-url');
    if(coffee){
        //console.log(coffee);
        var tea = [];
        for(var i = 0; i<coffee.length; i++){
            var cappuccino = coffee[i].match(/"([^"]+)","url":"([^"]+)"/);
            //console.log(cappuccino[2]);
            if(cappuccino[1] == 'Books'){
                tea.push(cappuccino[2]);
            }
        }
        for(var i = 0; i<tea.length; i++){
            var suspect = tea[i];
            var target = main_address+suspect;
            console.log(target);
            if (validUrl.isUri(target)){
                console.log('Looks like an URL');
            } else {
                console.log('Not a URL');
            }
        }
    } else {
        console.log("No matches!");
    }
}