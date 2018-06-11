import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, TextField} from '@core/mui-exports';
import {Form, Field, FormRenderProps} from 'react-final-form';

import {ICompanyDto} from 'client-common-lib';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';
import {FormTextField, validatorRequired} from '@common/form-utils';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.HTMLProps<any> {
}

interface IState {
  company?: ICompanyDto;
}

/**
 * Edit mode for companiies
 */
export class CompanyEditComponent extends React.Component<IProps, IState> {

  private _companiesContext: ICompaniesContext;
  public static contextTypes: TCompaniesContextTypes = CompaniesContextTypes;

  constructor(props: IProps, context: ICompaniesContext) {
    super(props);

    this.state = {};
    this._companiesContext = context;
  }


  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div style={this.props.style}>{this.state.company &&
        <Form
          onSubmit={(values) => this.handleSubmitForm(values)}
          initialValues={{
            companyName: this.state.company.name,
            companyDescription: this.state.company.description
          }}
          render={(props: FormRenderProps) => (
            <form onSubmit={props.handleSubmit}>
              <div>
                <Field
                  name="companyName"
                  component={FormTextField}
                  type="text"
                  label="Name"
                  fullWidth={true}
                  required={true}
                  validate={validatorRequired}
                />
              </div>
              <div>
                <Field
                  name="companyDescription"
                  component={FormTextField}
                  type="text"
                  label="Description"
                  fullWidth={true}
                />
              </div>
              <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Button
                    type="submit"
                    variant="raised"
                    color="primary"
                    disabled={props.submitting || props.pristine  || props.invalid}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      }
      </div>
    );
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {
    this.loadCompany();
  }

  private async loadCompany(): Promise<void> {

    let companyId = Number.parseInt(this.props.match.params.companyId);
    let company = await this._companiesContext.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }

  /**
   * Invoked when user clicks Update button
   */
  private async handleUpdateClick(): Promise<void> {
    if(this.state.company) {
      await this._companiesContext.companyHttpService.updateCompany(this.state.company);
      this._companiesContext.appNavigationService.goToCompanyView(this.state.company.companyId);
    }
  }

  /**
   * Invoked by final-form
   * TODO: make it failed with strict signature (tslint should assert missing params)
   */
  private handleSubmitForm(values: object): void {

    if(!this.state.company)
      throw new Error('Unexpected: company is undefined');

    let company: ICompanyDto = {
      companyId: this.state.company.companyId,
      name: values['companyName'],
      description: values['companyDescription']
    };

    this._companiesContext.companyHttpService.updateCompany(company);
  }
}

