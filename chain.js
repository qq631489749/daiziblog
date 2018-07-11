Function.prototype.after = function (fn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        if (ret === 'next') {
            return fn.apply(this, arguments);
        }
        return ret;
    }
}

var test1 = function (x) {
    if (x === 1) {
        return x;
    }
    return 'next';
}

var test2 = function (x) {
    if (x === 2) {
        return x;
    }
    return 'next';
}

var test3 = function (x) {
    if (x === 3) {
        return x;
    }
    return 'next';
}

var test4 = function (x) {
    if (x === 4) {
        return x;
    }
    return 'next';
}

var a = test1.after(test2).after(test3).after(test4);
var b = a(4);
console.log(b)