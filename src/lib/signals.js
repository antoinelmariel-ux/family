import { useEffect, useState } from './hooks.js';

let currentCollector = null;

function trackSignal(signal) {
  if (currentCollector) {
    currentCollector.add(signal);
  }
}

function subscribeToSignals(signals, callback) {
  const unsubscribers = [];
  signals.forEach((signal) => {
    unsubscribers.push(signal.subscribe(callback));
  });
  return () => {
    while (unsubscribers.length) {
      const unsubscribe = unsubscribers.pop();
      unsubscribe();
    }
  };
}

function runTracked(fn) {
  const collector = new Set();
  const prevCollector = currentCollector;
  currentCollector = collector;
  const cleanup = fn();
  currentCollector = prevCollector;
  return { collector, cleanup };
}

export function signal(initialValue) {
  let value = initialValue;
  const listeners = new Set();

  return {
    get value() {
      trackSignal(this);
      return value;
    },
    set value(nextValue) {
      if (Object.is(value, nextValue)) {
        return;
      }
      value = nextValue;
      listeners.forEach((listener) => listener(value));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

export function computed(getter) {
  const result = signal(undefined);
  let unsubscribe = () => {};

  const recompute = () => {
    unsubscribe();
    const { collector } = runTracked(() => {
      result.value = getter();
    });
    unsubscribe = subscribeToSignals(collector, recompute);
  };

  recompute();

  const computedSignal = {
    get value() {
      trackSignal(computedSignal);
      return result.value;
    },
    subscribe(listener) {
      return result.subscribe(listener);
    }
  };

  return computedSignal;
}

export function useSignalValue(sig) {
  const [value, setValue] = useState(sig.value);

  useEffect(() => {
    setValue(sig.value);
    return sig.subscribe((next) => {
      setValue(next);
    });
  }, [sig]);

  return value;
}

export function useSignalEffect(effect) {
  useEffect(() => {
    let { collector, cleanup } = runTracked(effect);
    let unsubscribe = subscribeToSignals(collector, rerun);

    function rerun() {
      if (typeof cleanup === 'function') {
        cleanup();
      }
      unsubscribe();
      ({ collector, cleanup } = runTracked(effect));
      unsubscribe = subscribeToSignals(collector, rerun);
    }

    return () => {
      unsubscribe();
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [effect]);
}
