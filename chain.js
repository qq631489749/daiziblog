//这个方法在职责链模式和装饰者模式都有用到，但他们的意图是不一样的
//职责链模式中，after扮演的是指定下一个职责链，并用闭包存起来
//而装饰者模式中，也是用闭包把之前的方法装饰完之后，赋值给一个函数
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