(counter = (function(){
    var _count = 0;
    console.log('count = ',_count);

    return function(){
        console.log('count = ',_count);
        return _count += 1;
    }
}))();

(function square(x) {
    console.log(x*x);
})(2);
 

(function (x) {
    console.log(x*x);
})(2);
 
