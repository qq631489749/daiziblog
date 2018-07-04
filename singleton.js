//《javascript设计模式与开发实践》中的第一个栗子
var Singleton = function (name) {
    this.name = name;
    this.instance = null;//刚看时，觉得这行代码并没有什么卵用，实际上...好像也是没什么卵用
}

Singleton.prototype.getName = function () {
    alert(this.name)
}

//这里为什么要把方法绑在一个函数上，之前觉得很奇怪，上下文this又不会指向Singleton的实例
//按照俺现在的水平来理解的话，可能是因为--如果要实现Singleton的单例，必须要借助另外一个函数来实现，但是为了体现
//这个函数跟Singleton有关系，就直接绑定在Singleton构造函数上面
Singleton.getInstance = function () {
    if (!this.instance) {//instance绑在了Singleton构造函数上面
        this.instance = new Singleton(name);
    }
    return this.instance;
}

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');

alert(a === b)   //true

//----------------------------------------------------------------------


//惰性单例--在需要的时候才会创建对象实例
Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            instance = new Singleton();
        }
        return instance;
    }
})()


//以上是将管理单例的逻辑跟创建对象都写在一个函数里面，代码健壮性下降了很多，也违反的单一职责原则
//最终形态应该是：


//1.管理单例的逻辑实现
var getSingle = function (fn) {
    var result;
    return function () {
        //这里也可以引申为是否执行过某些操作，而不一定是要返回某一个对象，请看下面的栗子2
        return result || (result = fn.apply(this, arguments));
    }
}

//实现Singleton类的单例
Singleton.getInstance = getSingle(function (name) {
    return new Singleton(name);
})

var a = Singleton.getInstance('aaaa');
var b = Singleton.getInstance('aaaa');
a === b;  // true



//栗子2----比如说某表单只能提交一次
var submit = getSingle(function () {
    form[0].submit();
    return true;
})