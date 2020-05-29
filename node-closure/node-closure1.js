var counter = (function() {
    var _count = 0;

    return function() {
        return _count += 1;
    };
})();

console.log(counter());
console.log(counter());


function counterFactory2() {
    var _count = 0;

    function count(value) {
        _count = value || _count;

        return _count;
    }

    return {
        count: count,
        inc: function() {
            return count(count() + 1);
        },
        dec: function() {
            return count(count() - 1);
        }
    };
}

var counter = counterFactory2();

console.log(counter.inc());
console.log(counter.inc());
console.log(counter.dec());