export interface IPagedResultDto<T> {
  rows: T[];
  totalRowCount: number;
}
