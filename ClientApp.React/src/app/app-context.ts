import {UserManager} from 'oidc-client';
import * as PropTypes from 'prop-types';
import {ConfirmationUi} from '@app-services/confirmation-ui';

/**
 * Common React context used through the application
 */
export interface IAppContext {
  userManager: UserManager;
  confirmationUi: Promise<ConfirmationUi>;
}

export type TAppContextTypes = PropTypes.ValidationMap<IAppContext>;
export const AppContextTypes: TAppContextTypes = {
  userManager: PropTypes.instanceOf(UserManager),
  confirmationUi: PropTypes.object
};
