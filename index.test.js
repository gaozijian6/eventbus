let EventBus = require('./index.js');

describe('EventBus', () => {

  beforeEach(() => {
    eventBus = new EventBus();
  });

  test('should subscribe to an event', () => {
    const eventName = 'testEvent';
    const callback = jest.fn();

    eventBus.subscribe(eventName, callback);
    eventBus.publish(eventName);

    expect(callback).toHaveBeenCalled();
  });

  test('should publish an event with data', () => {
    const eventName = 'testEventWithData';
    const data = { message: 'Hello, World!' };
    const callback = jest.fn();

    eventBus.subscribe(eventName, callback);
    eventBus.publish(eventName, data);

    expect(callback).toHaveBeenCalledWith(data);
  });

  test('should unsubscribe from an event', () => {
    const eventName = 'testEvent';
    const callback = jest.fn();

    eventBus.subscribe(eventName, callback);
    eventBus.unsubscribe(eventName, callback);
    eventBus.publish(eventName);

    expect(callback).not.toHaveBeenCalled();
  });

  test('should clear all subscriptions', () => {
    const eventName1 = 'testEvent1';
    const eventName2 = 'testEvent2';
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.subscribe(eventName1, callback1);
    eventBus.subscribe(eventName2, callback2);
    eventBus.clear();
    eventBus.publish(eventName1);
    eventBus.publish(eventName2);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  test('should not throw error when unsubscribing from non-existing event', () => {
    const callback = jest.fn();

    expect(() => eventBus.unsubscribe('nonExistingEvent', callback)).not.toThrow();
  });

  test('should not throw error when publishing to non-existing event', () => {
    expect(() => eventBus.publish('nonExistingEvent')).not.toThrow();
  });

  test('should handle multiple subscriptions to the same event', () => {
    const eventName = 'testEvent';
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.subscribe(eventName, callback1);
    eventBus.subscribe(eventName, callback2);
    eventBus.publish(eventName);

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  test('should not call unsubscribed callbacks', () => {
    const eventName = 'testEvent';
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.subscribe(eventName, callback1);
    eventBus.subscribe(eventName, callback2);
    eventBus.unsubscribe(eventName, callback1);
    eventBus.publish(eventName);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  test('should handle multiple events with different subscribers', () => {
    const eventName1 = 'testEvent1';
    const eventName2 = 'testEvent2';
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    eventBus.subscribe(eventName1, callback1);
    eventBus.subscribe(eventName2, callback2);
    eventBus.publish(eventName1);
    eventBus.publish(eventName2);

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();
  });

  test('should handle events with no subscribers', () => {
    expect(() => eventBus.publish('noSubscribersEvent')).not.toThrow();
  });
});
