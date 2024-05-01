class EventBus {
    constructor() {
        this.listeners = {};
    }

    // 订阅事件
    subscribe(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    // 发布事件
    publish(eventName, data) {
        const eventListeners = this.listeners[eventName];
        if (eventListeners) {
            eventListeners.forEach(listener => {
                listener(data);
            });
        }
    }

    // 取消订阅事件
    unsubscribe(eventName, callback) {
        const eventListeners = this.listeners[eventName];
        if (eventListeners) {
            this.listeners[eventName] = eventListeners.filter(listener => listener !== callback);
        }
    }

    // 清除所有订阅
    clear() {
        this.listeners = {};
    }
}


module.exports = EventBus;