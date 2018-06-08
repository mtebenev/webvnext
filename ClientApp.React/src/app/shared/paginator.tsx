import * as React from 'react';
import {Select, FormControl, InputLabel, MenuItem, Button, StyledComponentProps, StyleRules} from '@core/mui-exports';
import {ApplyStyles} from '@core/mui-decorators';

const ButtonSize = '15px';

interface IProps {

  /**
   * The length of the total number of items that are being paginated.
   */
  length: number;
  pageSize: number;

  /**
   * The zero-based page index of the displayed list of items.
   */
  pageIndex: number;

  /**
   * The set of provided page size options to display to the user.
   */
  pageSizeOptions: number[];

  onPageChange: (e: IPageChangeEvent) => void;
}

interface IState {
  pageIndex: number;
  pageSize: number;
}

export interface IPageChangeEvent {
  /** The current page index. */
  pageIndex: number;

  /**
   * Index of the page that was selected previously.
   */
  previousPageIndex: number;

  /** The current page size */
  pageSize: number;

  /** The current total number of items being paged */
  length: number;
}

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const styles: StyleRules = {

  paginatorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '56px',
    padding: '0 8px',
    flexWrap: 'wrap-reverse'
  }
};

/**
 * Port of Paginator component from @angular/material
 */
@ApplyStyles(styles)
export class Paginator extends React.Component<IProps & StyledComponentProps<keyof typeof styles>, IState> {

  constructor(props: IProps) {
    super(props);

    let pageIndex = Math.max(props.pageIndex, 0);
    this.state = {pageIndex: pageIndex, pageSize: props.pageSize};
  }

  public render(): React.ReactNode {
    return (
      <div className={this.props.classes!.paginatorContainer}>
        <div>
          <div>Items per page:</div>
          <Select
            value={this.state.pageSize}
            onChange={event => this.handlePageSizeChange(event)}
          >
            {this.props.pageSizeOptions.map(ps => (
              <MenuItem value={ps}>{ps}</MenuItem>
            ))}
          </Select>
        </div>
        <div className="mat-paginator-range-actions">
          <div className="mat-paginator-range-label">
            {this.getRangeLabel()}
          </div>
          <Button onClick={() => this.handleFirstPageClick()} disabled={!this.hasPreviousPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: ButtonSize}}>
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
            </svg>
          </Button>
          <Button onClick={() => this.handlePrevClick()} disabled={!this.hasPreviousPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: ButtonSize}}>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </Button>
          <Button onClick={() => this.handleNextClick()} disabled={!this.hasNextPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: ButtonSize}}>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </Button>
          <Button onClick={() => this.handleLastPageClick()} disabled={!this.hasNextPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: ButtonSize}}>
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
            </svg>
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Invoked when user clicks NEXT PAGE button
   */
  private handleNextClick(): void {
    if(this.hasNextPage()) {
      const previousPageIndex = this.state.pageIndex;

      this.setState({...this.state, pageIndex: this.state.pageIndex + 1}, () => {
        this.emitPageEvent(previousPageIndex);
      });
    }
  }

  /**
   * Invoked when user clicks PREVs PAGE button
   */
  private handlePrevClick(): void {
    if(this.hasPreviousPage()) {
      const previousPageIndex = this.state.pageIndex;
      this.setState({...this.state, pageIndex: this.state.pageIndex - 1}, () => {
        this.emitPageEvent(previousPageIndex);
      });
    }
  }

  /**
   * Invoked when user clicks FIRST PAGE button
   */
  private handleFirstPageClick(): void {
    if(this.hasPreviousPage()) {
      const previousPageIndex = this.state.pageIndex;
      this.setState({...this.state, pageIndex: 0}, () => {
        this.emitPageEvent(previousPageIndex);
      });
    }
  }

  /**
   * Invoked when user clicks LAST PAGE button
   */
  private handleLastPageClick(): void {
    if(this.hasNextPage()) {
      const previousPageIndex = this.state.pageIndex;

      this.setState({...this.state, pageIndex: this.getNumberOfPages()}, () => {
        this.emitPageEvent(previousPageIndex);
      });
    }
  }

  /**
   * Whether there is a previous page.
   */
  private hasPreviousPage(): boolean {
    return this.state.pageIndex >= 1 && this.props.pageSize != 0;
  }

  /**
   * Whether there is a next page.
   */
  private hasNextPage(): boolean {
    const numberOfPages = this.getNumberOfPages();
    return this.state.pageIndex < numberOfPages && this.props.pageSize != 0;
  }

  /**
   * Invoked when user changes page size
   */
  private handlePageSizeChange(event: any): void {
    // Current page needs to be updated to reflect the new page size. Navigate to the page
    // containing the previous page's first item.
    const startIndex = this.state.pageIndex * this.state.pageSize;
    const previousPageIndex = this.state.pageIndex;

    const newPageIndex = Math.floor(startIndex / this.state.pageSize) || 0;
    const newPageSize = event.target.value;

    this.setState({...this.state, pageIndex: newPageIndex, pageSize: newPageSize}, () => {
      this.emitPageEvent(previousPageIndex);
    });
  }

  /**
   * Calculate the number of pages
   */
  private getNumberOfPages(): number {
    return Math.ceil(this.props.length / this.props.pageSize) - 1;
  }

  private getRangeLabel(): string {

    if(this.props.length == 0 || this.state.pageSize == 0)
      return `0 of ${this.props.length}`;

    const length = Math.max(this.props.length, 0);
    const startIndex = this.state.pageIndex * this.state.pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < this.props.length
      ? Math.min(startIndex + this.state.pageSize, this.props.length)
      : startIndex + this.state.pageSize;

    return `${startIndex + 1} - ${endIndex} of ${this.props.length}`;
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private emitPageEvent(previousPageIndex: number): void {

    this.props.onPageChange({
      previousPageIndex,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      length: this.props.length
    });
  }
}
