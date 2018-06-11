/**
 * Paged result used in HTTP responses
 */
export interface IPagedResultDto<T> {
  rows: T[];
  totalRowCount: number;
}
