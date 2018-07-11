//发布者
function Publisher() {};

//发布消息
Publisher.prototype.publish = function(eventCenter, eventType) {
	eventCenter.trigger(eventType);
};

//订阅者
function Listener (triggertodo) {
	//发布消息后要干嘛
	this.triggertodo = triggertodo;
}

//去事件处理中心取消订阅
Listener.prototype.canelListen = function (eventCenter, eventType) {
	eventCenter.remove(eventType, this);
}

//去事件处理中心订阅
Listener.prototype.subscribe = function (eventCenter, eventType) {
	eventCenter.listen(eventType, this);
}

//事件处理中心
var EventCenter = (function() {
	//记录订阅者的信息
	var cache = {};
	
	return {
		//订阅
		listen: function (event, listener) {
			cache[event] = cache[event] || [];
			cache[event].push(listener);
		},
		//移除订阅
		remove: function(event, listener) {
			
			if (!cache[event] || cache[event].length === 0) {
				return;
			}

			var l = cache[event].length;
			while (l--) {
				if (cache[event][l] === listener) {
					cache[event].splice(l, 1);
					return console.log('订阅已取消！')
				}
			}
			return console.log('订阅不存在！')
		},
		//发布，第一个参数要传入订阅的参数
		trigger: function () {
			if (arguments.length === 0) {
				return console.log('请传入要发布的事件！')
			}
			var eventType = [].shift.call(arguments);
			if (!cache[eventType]) {
				return console.log('没有该事件！');
			}

			for (var i = 0, l = cache[eventType].length, listener; i < l; i++) {
				listener = cache[eventType][i];
				//通知订阅者去干一些事情，虽然不知道是什么事情
				listener.triggertodo(arguments);
			}
		}
	}
})()

//新建一个要租一栋别墅的打工仔
var l = new Listener(function () {
	console.log('租600平米的别墅!');
})

var p = new Publisher()

l.subscribe(EventCenter, '600bieshu')
l.canelListen(EventCenter, '600bieshu');

p.publish(EventCenter, '600bieshu')









//设计模式中的发布-订阅模式
var Event = (function() {
	var global = this,
		Event,
		_default = 'default';

	Event = (function() {
		var _listen,
			_trigger,
			_remove,
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {},
			_create,
			find,
			each = function (ary, fn) {
				var ret;
				for (var i = 0, l = ary.length; i < l; i++) {
					var n = ary[i];
					ret = fn.call(n, i, n);
				}
				return ret;
			};

		// 添加订阅
		_listen = function ( key, fn, cache ) {
			cache[ key ] = cache[ key ] || [];
			cache[ key ].push( fn );
		};

		//移除订阅事件,这里不能移除匿名函数，还有就是如果没有传入函数，则移除整个
		_remove = function ( key, fn, cache ) {
			if ( cache[ key ] ) {
				if ( fn ) {
					var l = cache[ key ].length;
					while (l--) {
						if ( cache[ key ][l] === fn ) {
							cache[ key ].splice( l, 1 );
						}
					}
				}
			} else {
				cache[ key ] = [];
			}
		};

		_trigger = function () {
			var cache = _shift.call(arguments),
				key = _shift.call(arguments),
				args = arguments,
				_self = this,
				ret,
				stack = cache[ key ];

			if ( !stack || !stack.length ) {
				return;
			}

			return each( stack, function () {
				return this.apply( _self, args );
			})
		};

		_create = function ( namespace ) {
			namespace = namespace || _default;
			var cache = {},
				offlineStack = [],
				ret = {
					listen: function( key, fn, last ) {
						_listen( key, fn, cache );
						if ( offlineStack === null ) {
							return;
						}

						if ( last === 'last' ) {
							offlineStack.length && offlineStack.pop();
						} else {
							each( offlineStack, function () {
								this();
							})
						}

						offlineStack = null;
					},
					one: function( key, fn, last ) {
						_remove( key, cache );
						this.listen( key, fn, last );
					},
					remove: function ( key, fn ) {
						_remove( key, cache, fn );
					},
					trigger: function () {
						var fn,
							args,
							_self = this;

						_unshift.call( arguments, cache );
						args = arguments;
						fn = function () {
							return _trigger.apply( _self, args );
						};

						if ( offlineStack ) {
							return offlineStack.push( fn );
						}

						return fn();
					}
				};

			return namespace ? ( namespaceCache[ namespace ] ? namespaceCache[ namespace ] : namespaceCache[ namespace ] = ret ) : ret;
				
		}

		return {
			create: _create,
			one: function( key, fn, last ) {
				var event = this.create();
				event.one( key, fn, last );
			},
			remove: function( key, fn ) {
				var event = this.create();
				event.remove( key, fn );
			},
			listen: function( key, fn, last ) {
				var event = this.create();
				event.listen( key, fn, last );
			},
			trigger: function () {
				var event = this.create();
				event.trigger.apply( this.arguments );
			}
		}	
		
	})()

	return Event;

})()

Event.create('namespace1').listen('data', function () {
	console.log(1111)
})

Event.trigger('data')