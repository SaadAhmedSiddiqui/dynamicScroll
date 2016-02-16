
(function DataGenerator() {
    "use strict";

    window.data = data('item $number', 1000, 'name');

    function data(str, quantity){
        var arr = [];
        for(var i=1; i<=quantity; i++){
            arr.push(str.replace('$number', i));
        }
        return arr;
    }

})();