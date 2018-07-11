//命令模式由3部分组成, 1.执行命令(又叫命令的发起者), 2.命令对象, 3.命令接受者(就是这个命令到底由谁来执行)

function RunCommand() {

    //只执行一个命令
    this.runOneCommand = function (command) {
        command.excute();
    }

    //宏指令
    this.runMoreCommand = function () {
        var l = arguments.length,
            arr = [];

        if (arguments.length === 0) {
            throw new Error('no command can run!');
        }

        for (var i = 0,command; i < l; i++) {
            command = arguments[i];
            arr.push(command.excute());
        }
    
        return arr;
    }
}

//命令对象，必须实现excute接口, fn为干什么, obj由谁去干
function Command( fn ) {
    return {
        excute: function() {
            return fn();
        }
    }
}

var rc = new RunCommand();

rc(Command(function () {
    return document.getElementById('id');
}))

