const EventBus = require('./index');

describe('EventBus', () => {
  let eventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  test('should subscribe to event and dispatch it', () => {
    const handler = jest.fn();
    eventBus.subscribe('testEvent', handler);
    eventBus.dispatch('testEvent');
    expect(handler).toHaveBeenCalled();
  });

  test('should unsubscribe from event', () => {
    const handler = jest.fn();
    const unsubscribe = eventBus.subscribe('testEvent', handler);
    unsubscribe();
    eventBus.dispatch('testEvent');
    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch event with data', () => {
    const handler = jest.fn();
    eventBus.subscribe('testEvent', handler);
    eventBus.dispatch('testEvent', 'data1', 'data2');
    expect(handler).toHaveBeenCalledWith('data1', 'data2');
  });

  test('should handle multiple subscribers for same event', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    eventBus.subscribe('testEvent', handler1);
    eventBus.subscribe('testEvent', handler2);
    eventBus.dispatch('testEvent');
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });

  test('should not throw error when dispatching to non-existing event', () => {
    expect(() => eventBus.dispatch('nonExistingEvent')).not.toThrow();
  });

  test('should not throw error when unsubscribing from non-existing event', () => {
    expect(() => eventBus.unsubscribe('nonExistingEvent')).not.toThrow();
  });

  test('should handle subscribing to multiple events', () => {
    const handler = jest.fn();
    eventBus.subscribe('event1', handler);
    eventBus.subscribe('event2', handler);
    eventBus.dispatch('event1');
    eventBus.dispatch('event2');
    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('should handle subscribing to non-existing event', () => {
    const handler = jest.fn();
    eventBus.subscribe('nonExistingEvent', handler);
    eventBus.dispatch('nonExistingEvent');
    expect(handler).toHaveBeenCalled();
  });

  test('should handle unsubscribing from non-existing event', () => {
    const handler = jest.fn();
    const unsubscribe = eventBus.subscribe('nonExistingEvent', handler);
    unsubscribe();
    expect(() => unsubscribe()).not.toThrow();
  });

  test('should handle dispatching with no subscribers', () => {
    expect(() => eventBus.dispatch('testEvent')).not.toThrow();
  });
});
