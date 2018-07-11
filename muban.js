
//定义抽象类
var Beverage = function() {

}
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}  

Beverage.prototype.boilWater = function () {
    console.log('把水煮沸！')
}

Beverage.prototype.pourInCup = function () {
    console.log('把' + this.name + '倒进杯子！');
}

Beverage.prototype.brew = function () {
    console.log('用沸水' + this.operate + this.name);
}

Beverage.prototype.addCondiments = function () {
    console.log('加' + this.condiments);
}

var Fa = function (operate, name, condiments) {
    this.name = name;
    this.operate = operate;
    this.condiments = condiments;
}

var Coffee = function (operate, name, condiments) {
    Fa.apply(this, arguments);
}

Coffee.prototype = new Beverage();

var Tea = function (operate, name, condiments) {
    Fa.apply(this, arguments);
}
Tea.prototype = new Beverage();


var c = new Coffee('冲泡', '咖啡', '糖和牛奶');
var t = new Tea('浸泡', '茶叶', '柠檬');

c.init();
console.log('------------------------')
t.init();


