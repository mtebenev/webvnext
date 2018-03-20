import * as React from 'react';
import List, {ListItem, ListItemText} from 'material-ui/List';
import {Link} from 'react-router-dom';

import {ICompanyQueryParamsDto, ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {IPagedResultDto} from '@common/ipaged-result-dto';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';


interface IState {
  companies?: IPagedResultDto<ICompanyDto>;
}

export class CompanyListComponent extends React.Component<React.HTMLProps<any>, IState> {

  private _companiesContext: ICompaniesContext;

  public static contextTypes: TCompaniesContextTypes = CompaniesContextTypes;

  constructor(props: React.Props<any>, context: ICompaniesContext) {
    super(props);

    this._companiesContext = context;
    this.state = {}
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div style={this.props.style}>
        <div>I am company list</div>
        <button onClick={e => this.handleGetCompaniesClick()}>Get Companies</button>

        {this.state.companies &&
          <List>
            {
              this.state.companies.rows.map(c => (
                <ListItem button={true} component={props => <Link {...props} to={`/companies/${c.companyId}`} />} >
                  <ListItemText primary={c.name} />
                </ListItem>
              ))
            }
          </List>
        }

      </div>
    );
  }

  public async handleGetCompaniesClick(): Promise<void> {

    let queryParams: ICompanyQueryParamsDto = {
      pageSize: 20,
      pageNumber: 0
    };

    let response = await this._companiesContext.companyHttpService.getCompanies(queryParams);
    this.setState({companies: response});
  }
}
