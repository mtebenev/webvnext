/**
 * Params for querying contacts
 */
export interface IContactQueryParamsDto {
  pageNumber: number;
  pageSize: number;
  filterText?: string;
}
