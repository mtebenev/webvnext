import {withStyles, StyleRules, StyleRulesCallback} from './mui-exports';

/**
 * Wraps MUI withStyles
 */
export function ApplyStyles<T extends {new(...args: any[]): {}}>(styles: StyleRules  | StyleRulesCallback): any {

  return (constructor: T) => {
    let anyc: any = constructor;
    let result = withStyles(styles)(anyc)
    return result;
  }
}
