import {getI18n} from 'react-i18next';

/**
 * Helpers for i18next
 */
export class IntlUtils {

  /**
   * Retrieves translation using global i18 instance, default namespace
   */
  public static t(key: string): string {

    let result = getI18n().t(key);
    return result;
  }

}
