import * as React from 'react';
import {AppBar, Toolbar, List, ListItem, ListItemText, Typography, Paper} from '@core/mui-exports';
import {Link} from 'react-router-dom';

import {ICompanyQueryParamsDto, ICompanyDto, IPagedResultDto} from 'client-common-lib';
import {withCompaniesContext, ICompaniesContextProps} from './companies-context';
import {FxFlex} from '@layout/fx-flex';
import {FxContainer} from '@layout/fx-container';
import {Paginator, IPageChangeEvent} from '@shared/paginator';
import {SearchBox} from '@shared/search-box';

interface IState {
  companies?: IPagedResultDto<ICompanyDto>;
  filterText?: string;
  pageNumber: number;
  pageSize: number;
  selectedCompanyId?: number;
}

type TProps = ICompaniesContextProps & React.HTMLProps<CompanyListComponentImpl>;

class CompanyListComponentImpl extends React.Component<TProps, IState> {

  constructor(props: TProps) {
    super(props);

    this.state = {pageNumber: 0, pageSize: 10};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <Paper style={this.props.style}>
        {this.state.companies &&
          <FxContainer
            flexFill={true}
            layout="column"
            layoutAlign="start stretch"
          >
            <AppBar position="relative" color="default" elevation={0}>
              <Toolbar>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                  <Typography variant="title">
                    Companies
                  </Typography>
                  <SearchBox onTextChanged={value => this.handleFilterTextChanged(value)} />
                </div>
              </Toolbar>
            </AppBar>
            <Paginator
              pageSize={10}
              length={100}
              pageSizeOptions={[5, 10, 25, 100]}
              onPageChange={e => {this.handlePageChange(e)}}
              pageIndex={0}
            />
            <FxFlex style={{overflow: 'auto'}}>
              <List>
                {
                  this.state.companies.rows.map(c => (
                    <ListItem
                      key={c.companyId}
                      selected={this.state.selectedCompanyId && c.companyId === this.state.selectedCompanyId ? true : false}
                      onClick={() => this.handleItemClick(c)}
                      button={true}
                      component={(props: any) => <Link {...props} to={`/companies/${c.companyId}`} />}
                    >
                      <ListItemText primary={c.name} />
                    </ListItem>
                  ))
                }
              </List>
            </FxFlex>
          </FxContainer>
        }

      </Paper>
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
      pageSize: this.state.pageSize,
      pageNumber: this.state.pageNumber,
      filterText: this.state.filterText
    };

    let response = await this.props.companiesContext.companyHttpService.getCompanies(queryParams);
    this.setState({...this.state, companies: response});
  }

  /**
   * Reacts on paginator state change
   */
  private handlePageChange(event: IPageChangeEvent): void {

    this.setState({...this.state, pageNumber: event.pageIndex, pageSize: event.pageSize}, () => {
      this.loadCompanies();
    });
  }

  /**
   * Invoked when user selects a company in the list
   */
  private handleItemClick(company: ICompanyDto): void {
    this.setState({...this.state, selectedCompanyId: company.companyId});
  }

  private handleFilterTextChanged(value: string): void {
    this.setState({...this.state, filterText: value}, () => {
      this.loadCompanies();
    });
  }
}

export const CompanyListComponent = withCompaniesContext(CompanyListComponentImpl);
