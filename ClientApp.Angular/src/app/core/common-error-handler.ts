import {ErrorHandler} from '@angular/core';

import {SimpleLogger} from './simple-logger';

export class CommonErrorHandler implements ErrorHandler {

  private logger: SimpleLogger;

  // TODO: Provide logger
  constructor() {
    this.logger = new SimpleLogger();
  }

  public handleError(error: any): void {

    console.error('Error caught in CommonErrorHandler');
    this.logger.logError(error);
  }

}
