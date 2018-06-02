import {withStyles} from './mui-exports';

/**
 * Wraps MUI withStyles
 */
export function MuiWithStyles<T extends {new(...args: any[]): {}}>(styles: any): any {

  return (constructor: T) => {
    let anyc: any = constructor;
    let result = withStyles(styles)(anyc)
    return result;
  }
}
