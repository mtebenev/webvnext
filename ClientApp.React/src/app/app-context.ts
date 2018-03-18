import {UserManager} from 'oidc-client';
import * as PropTypes from 'prop-types';

/**
 * Common React context used through the application
 */
export interface IAppContext {
  userManager: UserManager;
}

export type TAppContextTypes = PropTypes.ValidationMap<IAppContext>;
export const AppContextTypes: TAppContextTypes = {
  userManager: PropTypes.instanceOf(UserManager)
};
