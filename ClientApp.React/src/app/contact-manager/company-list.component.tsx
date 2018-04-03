import * as React from 'react';
import {AppBar, Toolbar, Button, Icon, List, IconButton, ListItem, ListItemText} from '@core/mui-exports';
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
        {this.state.companies &&
          <div>
            <AppBar position="static" color="default">
              <Toolbar>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                  Companies
                </div>
              </Toolbar>
            </AppBar>

            <List>
              {
                this.state.companies.rows.map(c => (
                  <ListItem button={true} component={(props: any) => <Link {...props} to={`/companies/${c.companyId}`} />} >
                    <ListItemText primary={c.name} />
                  </ListItem>
                ))
              }
            </List>
          </div>
        }

      </div>
    );
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {
    this.loadCompanies();
  }

  private async loadCompanies(): Promise<void> {

    let queryParams: ICompanyQueryParamsDto = {
      pageSize: 20,
      pageNumber: 0
    };

    let response = await this._companiesContext.companyHttpService.getCompanies(queryParams);
    this.setState({companies: response});
  }
}
