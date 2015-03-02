
exports.makeid = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

exports.capitalizeFirstLetter = function(nameArr) {
    var retArr = [];
    for (var i = 0; i < nameArr.length; i++) {
        var str = nameArr[i];
        retArr.push(str.charAt(0).toUpperCase() + str.slice(1));
    }
    return retArr;
};