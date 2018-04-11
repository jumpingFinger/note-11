var utils = (function () {
    //=>toArray:converts the class array to an array
    var toArray = function (classAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(classAry);
        } catch (e) {
            for (var i = 0; i < classAry.length; i++) {
                ary[ary.length] = classAry[i];
            }
        }
        return ary;
    };

    //=>toJSON:converts a JSON formatted string to a JSON object
    var toJSON = function (str) {
        return 'JSON' in window ? JSON.parse(str) : eval('(' + str + ')');
    };

    return {
        toArray: toArray,
        toJSON: toJSON
    }
})();/**
 * Created by Lenovo on 2018/3/10.
 */
