import * as React from 'react';
import {AppBar, Toolbar, Button, Typography} from '@core/mui-exports';
import {Form, Field, FormRenderProps} from 'react-final-form';

import {ICompanyDto} from 'client-common-lib';
import {withCompaniesContext, ICompaniesContextProps} from './companies-context';
import {FormTextField, validatorRequired} from '@common/form-utils';

type IProps = ICompaniesContextProps & React.HTMLProps<CompanyNewComponentImpl>;

/**
 * Creates a new company
 */
export class CompanyNewComponentImpl extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <div style={this.props.style}>{
        <React.Fragment>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title">
                New Company
              </Typography>
            </Toolbar>

          </AppBar>

          <Form
            onSubmit={(values) => this.handleSubmitForm(values)}
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
                      disabled={props.submitting || props.pristine || props.invalid}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </form>

            )}
          />
        </React.Fragment>
      }
      </div>
    );
  }

  /**
   * Invoked by final-form
   * TODO: make it failed with strict signature (tslint should assert missing params)
   */
  private handleSubmitForm(values: object): void {

    let company: ICompanyDto = {
      companyId: 0,
      name: values['companyName'],
      description: values['companyDescription']
    };

    this.props.companiesContext.companyHttpService.createCompany(company);
  }
}

export const CompanyNewComponent = withCompaniesContext(CompanyNewComponentImpl);

