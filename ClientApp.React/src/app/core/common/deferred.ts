export class Deferred<T> {

  public readonly promise: Promise<T>;
  public resolve: (value?: T | PromiseLike<T>) => void;
  public reject: (reason?: any) => void;

  /**
   * Use to create a deferred result with value
   */
  public static resolve<T>(value: T): Deferred<T> {

    let result = new Deferred<T>();
    result.resolve(value);

    return result;
  }

  /**
   * Use to create a resolved promise with value.
   */
  public static resolvePromise<T>(value?: T): Promise<T> {
    let deferred = new Deferred<T>();
    deferred.resolve(value);
    return deferred.promise;
  }

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
