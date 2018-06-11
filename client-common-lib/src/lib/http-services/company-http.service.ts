import {HttpServiceBase} from '../core/http-service-base';
import {IPagedResultDto} from '../dto/ipaged-result-dto';
import {ICompanyQueryParamsDto} from '../dto/icompany-query-params-dto';
import {ICompanyDto} from '../dto/icompany-dto';

/**
 * Company-related HTTP methods
 */

export class CompanyHttpService extends HttpServiceBase {

  /**
   * Load companies of the current user
   */
  public getCompanies(queryParams: ICompanyQueryParamsDto): Promise<IPagedResultDto<ICompanyDto>> {

    let stringifiedParams: {[param: string]: string} = {
      pageNumber: queryParams.pageNumber.toString(),
      pageSize: queryParams.pageSize.toString()
    };

    if(queryParams.filterText)
      stringifiedParams.filterText = queryParams.filterText;

    return this.doGet<IPagedResultDto<ICompanyDto>>(null, stringifiedParams);
  }

  /**
   * Load specific company of the current user
   */
  public getCompany(companyId: number): Promise<ICompanyDto> {

    return this.doGet<ICompanyDto>(companyId.toString());
  }

  /**
   * Create a new company for the current user
   */
  public createCompany(companyDto: ICompanyDto): Promise<ICompanyDto> {
    return this.doPost<ICompanyDto, ICompanyDto>(companyDto);
  }

  /**
   * Updates an existing company
   */
  public updateCompany(companyDto: ICompanyDto): Promise<void> {
    return this.doPut({companyId: companyDto.companyId.toString()}, companyDto);
  }

  /**
   * Delete company of the current user
   */
  public deleteCompany(companyId: number): Promise<void> {
    return this.doDelete({companyId: companyId.toString()});
  }
}
