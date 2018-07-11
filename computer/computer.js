
//执行者
function add(x, y) { return x + y; } ;
function sub(x, y) { return x - y; } ;
function mul(x, y) { return x * y; } ;
function div(x, y) { return x / y; } ;

var doObj = {
    add: function (x, y) {
        return x + y;
    },

}
 

var Command = function (execute, undo, value) {
    this.execute = execute;
    this.undo = undo;
    this.value = value;
}

//每一条命令就是一个类,每个命令类里面都必须要实现某一个接口
 
//每一条命令就是一个类
var AddCommand = function (value) {
    return new Command(add, sub, value);
};

//每一条命令就是一个类
var SubCommand = function (value) {
    return new Command(sub, add, value);
};

//每一条命令就是一个类
var MulCommand = function (value) {
    return new Command(mul, div, value);
};

//每一条命令就是一个类
var DivCommand = function (value) {
    return new Command(div, mul, value);
};
 
var Calculator = function () {
    //计算的数的总和
    var current = 0;

    //指令队列
    var commands = [];
 
    //将首字母变成大写
    function action(command) {
        var name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    
    return {
        execute: function (command) {
            current = command.execute(current, command.value);
            commands.push(command);
            log.add(action(command) + ": " + command.value);
        },
 
        undo: function () {
            var command = commands.pop();
            current = command.undo(current, command.value);
            log.add("Undo " + action(command) + ": " + command.value);
        },
 
        getCurrentValue: function () {
            return current;
        }
    }
}

var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 

//真正执行命令的函数
function run() {
    var calculator = new Calculator();
    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    calculator.execute(new MulCommand(6));
    calculator.execute(new DivCommand(2));
    calculator.execute(new AddCommand(900));
    calculator.undo();
    calculator.undo();
    log.add("\nValue: " + calculator.getCurrentValue());
    log.show();
}



//---------------------------------------------------
//用户的行为
var User = function() {
    this.eat = function (food) {
        console.log('吃' + food);
    }

    this.order = function (foodname) {
        console.log('点了一份' + food);
    }

    this.canelOrder = function () {

    }
}


//服务员
var Server = (function () {
    var serverId = 1;

    return function(name) {
        //服务员id
        this.id = serverId++;

        //订单
        this.orders = [];

        //服务员的名字
        this.name = name;
    }
    

})()

Server.prototype.commitOrderToCooker = function (cooker, order) {
    //提交订单给厨师之后，厨师炒菜
    var newOrder = {
        serverid: this.id,
        order: order
    }

    cooker.orderList.push(newOrder);
    cooker.chaocao();
    
}



//厨师
var Cooker = function () {

    //这个属性用来判断厨师是否在炒菜，避免重复执行炒菜功能
    this.isbusy = false;

    this.orderList = [];

}

Cooker.prototype.chaocao = function () {
    this.orderList;
    if ( !_order || _order.length ) {
        //这里要不要为每个服务员添加一个id,要不的话不知道是哪个服务员交给他的
       return this.diaoServer(order.serverid);
    }


    this.isbusy = true;

    for (var i = 0, l = _order.length; i < l; i++) {
        if (this[_order[i]]) {
            this[_order[i]]();
        } else {
            console.log()
        }
        
    }

    this.isbusy = false;

}

Cooker.prototype.diaoServer = function (serverid, msg) {
    console.log()
}

var Menu = function () {

}



var cook = {
    danchaofan: function () {
        console.log('dancaodan')
    },
    chaoniuhe: function () {
        console.log('chaoniuhe');
    }
}

var setChaoniuheCommand = function ( receiver ) {
    return {
        execute: function () {
            receiver.chaoniuhe();
        }
    }

}

var danchaofanCommand = function (receiver) {
    this.receiver = receiver;
}

danchaofanCommand.prototype.execute = function() {
    this.receiver.danchaofan();
}

/*
命令模式跟策略模式的异同
    不同点:
    1.策略模式把环境类和算法对象耦合在了一起，命令模式则通过命令类，把执行类跟

*/