
var Observer = (function () {
    var id = 0;
    return function ( dosomething ) {
        this.id = ++id;
        this.dosomething = dosomething;
    }
})()

var BObserver = function () {
    this.list = [];
    this.add = function (Observer) {
        this.list.push(Observer.id);
    }

    //通知观察者
    this.notify = function ( key ) {
        this.event[key]
    }

    //取消观察
    this.remove = function () {

    }
}


//-------------------------------------------------------------------------
function ObserverList(){
    this.observerList = [];
}

//添加观察者
ObserverList.prototype.add = function( obj ){
    return this.observerList.push( obj );
};

//获取观察者总数
ObserverList.prototype.count = function(){
    return this.observerList.length;
};

//获取该观察者
ObserverList.prototype.get = function( index ){
    if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ] || null;
    }
};

//查询观察者是否在被观察列表中
ObserverList.prototype.indexOf = function( obj, startIndex ){
    var i = startIndex;
    while( i < this.observerList.length ){
        if( this.observerList[i] === obj ){
        return i;
        }
        i++;
    }
    return -1;
};
ObserverList.prototype.removeAt = function( index ){
    this.observerList.splice( index, 1 );
};


//被观察者
function Subject(){
    this.observers = new ObserverList();
}

//添加观察者
Subject.prototype.addObserver = function( observer ){
    this.observers.add( observer );
};

//移除观察者
Subject.prototype.removeObserver = function( observer ){
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

Subject.prototype.notify = function( context ){
    var observerCount = this.observers.count();
    for(var i=0; i < observerCount; i++){
        this.observers.get(i).notifytodo( context );
    }
};



//观察者
function Observer(notifytodo){
    //被通知后要干虾米
    this.notifytodo = notifytodo;
}

//观察者通知被观察者，有啥变化都不用通知我了
Observer.prototype.canelobserver = function (subject) {
    subject.removeObserver(this);
}