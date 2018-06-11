/**
 * Params for querying companies
 */
export interface ICompanyQueryParamsDto {
  pageNumber: number;
  pageSize: number;
  filterText?: string;
}
