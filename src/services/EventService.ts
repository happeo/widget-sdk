
export interface HappeoEvent<T> {
  id: string;
  type: string;
  emit: (data: T) => void;
}

export interface UnbindedHappeoEvent<T> {
  promise: Promise<HappeoEvent<T>> | null; 
  resolve?: (value: HappeoEvent<T> | PromiseLike<HappeoEvent<T>>) => void; 
  reject?: (reason?: any) => void;
}

export class EventService {
  private bindedHandlers: HappeoEvent<any>[] = [];
  private unbindedHandlers: any[] = [];

  public static getInstance(): EventService {
    if (typeof window.__happeoEvents === "undefined") {
      window.__happeoEvents = new EventService();
    }
    return window.__happeoEvents;
  }

  public registerListener<T>(id: string, type: string, callback: (data: T) => void): void {

    // Validate if there is already an event handler registered
    const event = this.bindedHandlers.find(e => e.id === id && e.type === type);

    if (event) {
      event.emit = callback;
    } else {
      this.bindedHandlers.push({
        id,
        type,
        emit: callback
      });
    }

    // Let undbinded handlers know that there is a new listener
    if (this.unbindedHandlers.length === 0) {
      return;
    }

    const unbindedTypeHandlers = this.unbindedHandlers.filter(e => e.type === type);

    for (const unbindedTypeHandler of unbindedTypeHandlers) {
      const bindedHandler = this.bindedHandlers.find(e => e.id === unbindedTypeHandler.trigger);
      if (bindedHandler) {
        unbindedTypeHandler.defer.resolve(bindedHandler);

        const unbindedIdx = this.unbindedHandlers.findIndex(e => e.trigger === unbindedTypeHandler.trigger);
        if (unbindedIdx > -1) {
          this.unbindedHandlers.splice(unbindedIdx, 1);
        }
      }
    }
  }

  public async registerEmitter<T>(type: string): Promise<HappeoEvent<T> | HappeoEvent<T>[] | null> {

    // Get the listener
    const listener = this.bindedHandlers.filter(e => e.type === type);

    if (listener) {
      // Listener available, returning it
      return listener;
    } else {
      // Listener not registered, so register it as an unbinded emitter
      const unbindedHandler = this.unbindedHandlers.find(e => e.trigger === type);

      if (unbindedHandler) {
        return unbindedHandler.defer.promise;
      } else {
        const defer = this.deferHandler();

        this.unbindedHandlers.push({
          trigger: type,
          defer
        });

        return defer.promise;
      }
    }
  }

  public unregisterListener(id: string, type: string): void {
    const bindedHandler = this.bindedHandlers.find(e => e.id === id && e.type === type);

    if (bindedHandler) {
      const bindedIdx = this.bindedHandlers.findIndex(e => e.id === id && e.type === type);
      if (bindedIdx > -1) {
        this.bindedHandlers.splice(bindedIdx, 1);
      }
    }
  }

  private deferHandler<T>(): UnbindedHappeoEvent<T> {
    const defer: UnbindedHappeoEvent<T> = {
      promise: null,
      resolve: undefined,
      reject: undefined
    };
    
    const promise = new Promise<HappeoEvent<T>>((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });

    defer.promise = promise;
    return defer;
  }
}