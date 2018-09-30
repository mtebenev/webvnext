import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button} from '@core/mui-exports';
import {Form, Field, FormRenderProps} from 'react-final-form';

import {ICompanyDto} from 'client-common-lib';
import {withCompaniesContext, ICompaniesContextProps} from './companies-context';
import {FormTextField, validatorRequired} from '@common/form-utils';
import {MaterialBox} from '@layout/material-box';

interface IRouteParams {
  companyId: string;
}

type TProps = ICompaniesContextProps & RouteComponentProps<IRouteParams> & React.HTMLProps<CompanyEditComponentImpl>;

interface IState {
  company?: ICompanyDto;
}

/**
 * Edit mode for companiies
 */
class CompanyEditComponentImpl extends React.Component<TProps, IState> {

  constructor(props: TProps) {
    super(props);


    this.state = {};
  }


  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div style={this.props.style}>{this.state.company &&
        <MaterialBox>
          <Form
            onSubmit={(values) => this.handleSubmitForm(values)}
            initialValues={{
              companyName: this.state.company.name,
              companyDescription: this.state.company.description
            }}
            render={(props: FormRenderProps) => (
              <form onSubmit={props.handleSubmit}>
                <Field
                  name="companyName"
                  component={FormTextField}
                  type="text"
                  label="Name"
                  fullWidth={true}
                  required={true}
                  validate={validatorRequired}
                />
                <Field
                  name="companyDescription"
                  component={FormTextField}
                  type="text"
                  label="Description"
                  fullWidth={true}
                />
                <div>
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button
                      type="submit"
                      variant="raised"
                      color="primary"
                      disabled={props.submitting || props.pristine || props.invalid}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </form>
            )}
          />
        </MaterialBox>
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
    let company = await this.props.companiesContext.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }

  /**
   * Invoked when user clicks Update button
   */
  private async handleUpdateClick(): Promise<void> {
    if(this.state.company) {
      await this.props.companiesContext.companyHttpService.updateCompany(this.state.company);
      this.props.companiesContext.appNavigationService.goToCompanyView(this.state.company.companyId);
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

    this.props.companiesContext.companyHttpService.updateCompany(company);
  }
}

export const CompanyEditComponent = withCompaniesContext(CompanyEditComponentImpl);

