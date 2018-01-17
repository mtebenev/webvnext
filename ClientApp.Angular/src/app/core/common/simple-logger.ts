export class SimpleLogger {

  public logError(error: Error): void {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}
