

(function() {
	if (window.qb_bridge == undefined) {
		// check ua to make sure it's our lite version instead of other browsers
		var ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('mqqbrowser/5') != -1) {
			window.qb_bridge = {
				nativeExec : function(service, action, callbackId, argsJson) {
					return prompt(argsJson, 'mtt:[' + [service, action, callbackId] + ']');
				}
			};
		} else {
			console.warn('Not a qq browser or version too old');
			return;
		}
	}


	qb_bridge.callbackId = Math.floor(Math.random() * 2000000000);
	qb_bridge.callbacks = {};

	qb_bridge.exec = function(success, fail, service, action, args) {
		var callbackId = service + qb_bridge.callbackId++,
			argsJson = args ? JSON.stringify(args) : "";

		if (success || fail) {
			qb_bridge.callbacks[callbackId] = {success:success, fail:fail};
		}

		var ret = qb_bridge.nativeExec(service, action, callbackId, argsJson);
		if (ret === 'true') {
			return true;
		} else if (ret === 'false') {
			return false;
		} else {
			return ret;
		}
	};

	qb_bridge.callbackFromNative = function(callbackId, args) {
		var callback = qb_bridge.callbacks[callbackId];
		var argsJson = JSON.parse(args); 

		if (callback) {
			if (argsJson.succ) {
				callback.success && callback.success(argsJson.msg);
			} else {
				callback.fail && callback.fail(argsJson.msg);
			}

			if (!argsJson.keep) {
				delete qb_bridge.callbacks[callbackId];
			}
		}
	};

	qb_bridge.createEvent = function(type, data) {
	    var event = document.createEvent('Events');
	    event.initEvent(type, false, false);
	    if (data) {
	        for (var i in data) {
	            if (data.hasOwnProperty(i)) {
	                event[i] = data[i];
	            }
	        }
	    }
	    return event;
	}

	qb_bridge.fireEvent = function(type, params) {
		var channel = qb_channel[type];
		if (channel) {
			var data = params && JSON.parse(params);
			var evt = qb_bridge.createEvent(type, data);
			channel.fire(evt);
		};
	}


	var QbChannel = function (type) {
		this.type = type;
		this.handlers = {};
		this.numHandlers = 0;
		this.onHasSubscribersChange = null;
	}
	,
	    qb_channel = {
	        create: function(type) {
	            return qb_channel[type] = new QbChannel(type);
	        },
	        nextGuid: 0,
	    };

	QbChannel.prototype.subscribe = function(f) {
	    var func = f,
	        guid = f.observer_guid;

	    if (!guid) {
	        // first time any channel has seen this subscriber
	        guid = '' + qb_channel.nextGuid++;
	    }
	    func.observer_guid = guid;
	    f.observer_guid = guid;

	    // Don't add the same handler more than once.
	    if (!this.handlers[guid]) {
	        this.handlers[guid] = func;
	        this.numHandlers++;
	        if (this.numHandlers == 1) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Unsubscribes the function with the given guid from the channel.
	 */
	QbChannel.prototype.unsubscribe = function(f) {
	    var guid = f.observer_guid,
	        handler = this.handlers[guid];
	    if (handler) {
	        delete this.handlers[guid];
	        this.numHandlers--;
	        if (this.numHandlers === 0) {
	            this.onHasSubscribersChange && this.onHasSubscribersChange();
	        }
	    }
	};

	/**
	 * Calls all functions subscribed to this channel.
	 */
	QbChannel.prototype.fire = function(e) {
	    if (this.numHandlers) {
	        // Copy the values first so that it is safe to modify it from within
	        // callbacks.
	        var toCall = [];
	        for (var item in this.handlers) {
	            toCall.push(this.handlers[item]);
	        }
	        for (var i = 0; i < toCall.length; ++i) {
	            toCall[i](e);
	        }
	    }
	};

	window.qb = {
		/**
		 * QQ羌頵�������埦�絋�"5.0"
		 *
		 * @since 5.0
		 */
		get appVersion() { return qb_bridge.exec(null, null, "qb", "appVersion", null);},

		/**
		 * QQ羌頵���UA
		 *
		 * @since 5.0
		 */
		get qua() { return qb_bridge.exec(null, null, "qb", "qua", null); },

		/**
		 * 莪�莎傑�茹�����篋�����
		 *
		 * @param {ShareParams} params 
		 * @since 5.0
		 */
		share : function(params) {
			qb_bridge.exec(null, null, "qb", "share", params);
		},

		/**
		 * �丞ずnative��toast綣号�
		 *
		 * @param {String} text 荀��丞ず��羔�������
		 * @param {Integer} duration 羔����丞ず�狗�随�綽�蕁紙��0����1. 0莨��㍼�1莨���
		 */
		toast : function(text, duration) {
			qb_bridge.exec(null, null, "qb", "toast", {text: text, duration: duration});
		},

		/**
		 * �㊥�丞鎧膸�beep��腓咲��
		 *
		 * @param {Integer} times �㊥�丈���
		 */
		beep : function(times) {
			qb_bridge.exec(null, null, 'qb', 'beep', {times: times});
		},

		/**
		 * ���咲����
		 *
		 * @param {Long} milliseconds �����狗�器�罸��鐚�
		 */
		vibrate : function(milliseconds) {
			qb_bridge.exec(null, null, 'qb', 'vibrate', {milliseconds: milliseconds});
		},


		/**
		 * 羞糸��QQ羌頵������篋�篁句��������
		 *
		 * @param {String} type 'onvolumedown' | 'onvolumeup'
		 * @param {Function} handler 篋�篁九��莪��醇��
		 * @param {Boolean} capture 
		 */
		addEventListener : function(type, handler, capture) {
			if (type !== 'onvolumedown' && type !== 'onvolumeup') {
					return;
			}

			var channel = qb_channel[type];
			if (!channel) {
				channel = qb_channel.create(type);
				channel.onHasSubscribersChange = function() {
					qb_bridge.exec(null, null, "qb", "subscribeChanged", {numHandlers:this.numHandlers, type:type});
				}
			}
			channel.subscribe(handler);
		},

		/**
		 * 腱脂��QQ羌頵������篋�篁句������
		 */
		removeEventListener : function(type, handler, capture) {
			if (type !== 'onvolumedown' && type !== 'onvolumeup') {
					return;
			}

			var channel = qb_channel[type];
			if (channel) {
				channel.unsubscribe(handler);
			};
		},

		/**
		 * 莅上��後�割拭��
		 *
		 * @since 5.0
		 */
		device : {
			/**
			 * ��篏�膤紫������絋�2.3
			 *
			 * @since 5.0
			 */
			get version() { return qb_bridge.exec(null, null, "device", "version", null);},

			/**
			 * ����絎�箙���莅上�����
			 *
			 * @since 5.0
			 */
			get model() { return qb_bridge.exec(null, null, "device", "model", null);},

			/**
			 * 莅上�綛喝佘�Android鐚�
			 *
			 * @since 5.0
			 */
			get platform() { return qb_bridge.exec(null, null, "device", "platform", null);}, 
		},

		skin : {
			/**
			 * �桁�綵�����������贋─綣�
			 *
			 * @since 5.0
			 */
			get nightmodeEnabled() {
				return qb_bridge.exec(null, null, "skin", "nightmodeEnabled", null);
			}
		},

		connection : {
			/**
			 * �桁�綵���臀�膸�菴��ョ��膠糸��鐚�'none', 'wifi', '2g', '3g', 'unknown'
			 *
			 * @return {String}
			 * @since 5.0
			 */
			get type() {
				return qb_bridge.exec(null, null, "connection", "type", null);
			},

			/**
			 * �����膸����≫�篁吟��
			 *
			 * @param {String} type 'onchange'
			 * @param {Function} handler 臀�膸����≫�篁九����醇��
			 *
			 * @since 5.0
			 */
			addEventListener : function(type, handler, capture) {
				if (type !== 'onchange') {
					return;
				}

				var realType = 'onconnectionchange';
				var channel = qb_channel[realType];
				if (!channel) {
					channel = qb_channel.create(realType);
					channel.onHasSubscribersChange = function() {
						qb_bridge.exec(null, null, "connection", "subscribeChanged", {numHandlers:this.numHandlers});
					}
				}
				channel.subscribe(handler);
			},

			/**
			 * 腱脂�ょ�膸����≫�篁句������
			 *
			 * @param type 'onchange'
			 */
			removeEventListener : function(type, handler, capture) {
				if (type !== 'onchange') {
					return;
				}

				var realType = 'onconnectionchange';
				var channel = qb_channel[realType];
				if (channel) {
					channel.unsubscribe(handler);
				};
			},
		},

		/**
		 * 絮鎶��у�吟���坂�W3C Screen Orientation API
		 *
		 * @since 5.0
		 */
		screen : {
			/**
			 * 綵���絮鎶��劫��鐚�'portrait' | 'landscape')
			 *
			 * @since 5.0
			 */
			get orientation() { return qb_bridge.exec(null, null, "screen", "orientation", null);},

			/**
			 * ��絎�絮鎶��劫��
			 *
			 * @param orientation 'portrait' | 'landscape'
			 *
			 * @return {Boolean} true ����, false ��羈�����
			 *
			 * @since 5.0
			 */
			lockOrientation : function(orientation) {
				return qb_bridge.exec(null, null, "screen", "lockOrientation", {"orientation" : orientation});
			},

			/**
			 * ��羔�絮鎶���絎���
			 *
			 * @since 5.0
			 */
			unlockOrientation : function() {
				qb_bridge.exec(null, null, "screen", "unlockOrientation", null);
			},

			/**
			 * �桁�綵�����������倶����
			 *
			 * @since 5.0
			 */
			get fullscreenEnabled() {
				return qb_bridge.exec(null, null, "screen", "fullscreenEnabled", null);
			},

			/**
			 * 莚傑����罔≦�鐚����篁ュ���茹����医�����鎴ュ�傑�鎞�筝����丞ず��羈��莉糸�����銀賢��筝��������罔≦�
			 *
			 * @since 5.0
			 */
			requestFullscreen : function() {
				return qb_bridge.exec(null, null, "screen", "requestFullScreen", null);
			},

			/**
			 * ���阪���罔≦���羈�����阪���筝�篌��劫����決�臀��絋������決�臀�����罔≦�鐚�莪�����醇�遺札���茹����篆������罔≦���
			 *
			 * @since 5.0
			 */
			exitFullscreen : function() {
				return qb_bridge.exec(null, null, "screen", "exitFullScreen", null);
			},

			/**
			 * ������莉��綛��劫��篋�篁�
			 *
			 * @param {String} type 'onorientationchange'
			 * @param {Function} handler 絮鎶���莉��篁九��莪��醇��
			 * @param {Boolean} capture
			 *
			 * @since 5.0
			 */
			addEventListener : function(type, handler, capture) {
				if (type !== 'onorientationchange') {
					return;
				}

				var channel = qb_channel['onorientationchange'];
				if (!channel) {
					channel = qb_channel.create('onorientationchange');
					channel.onHasSubscribersChange = function() {
						qb_bridge.exec(null, null, "screen", "subscribeChanged", {numHandlers:this.numHandlers});
					}
				}
				channel.subscribe(handler);
			},

			removeEventListener : function(type, handler, capture) {
				var channel = qb_channel[type];
				if (channel) {
					channel.unsubscribe(handler);
				};
			},
		},

		push : {
			/**
			 * ��QQ羌頵���push��佀絵����
			 *
			 * @param {String} uid ����id
			 * @param {String} feature
			 * @param {Function} callback ��佈���羈���膸�����莪�
			 *
			 * @since 5.0
			 */
			tokenFeature: function(uid, feature, callback) {
				return qb_bridge.exec(callback, null, "push", "tokenFeature", {uid: uid, feature: feature});
			}
		},
	};
})();