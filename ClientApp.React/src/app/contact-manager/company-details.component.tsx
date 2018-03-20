import * as React from 'react';
import {RouteComponentProps, Link, Route, Switch} from 'react-router-dom';

import {CompanyViewComponent, CompanyEditComponent} from './index';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.HTMLProps<any> {
}

/**
 * Logic for switching between view/edit company components
 */
export class CompanyDetailsComponent extends React.Component<IProps> {


  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  /**
   * React.Component
   * TODOA: we are hardcoding path in Route same as in App.Component instead of reusing ${this.props.match.url}. Should we introduce companyId to props?
   */
  public render(): React.ReactNode {

    return (
      <div style={this.props.style}>{this.props.match.params.companyId &&
        <div>
          Details component
          Company: {this.props.match.params.companyId}
        <Link to={`${this.props.match.url}/edit`}>Edit company</Link>

        <Switch>
          <Route exact={true} path={'/companies/:companyId'} render={props => (<CompanyViewComponent {...props} />)} />
          <Route path={'/companies/:companyId/edit'} render={props => (<CompanyEditComponent {...props} />)} />
        </Switch>

        </div>
      }
      </div>
    );
  }
}
