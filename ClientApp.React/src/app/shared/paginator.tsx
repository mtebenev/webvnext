import * as React from 'react';

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

  onPageChange: (e: IPageChangeEvent) => void;
}

interface IState {
  pageIndex: number;
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

/**
 * Port of Paginator component from @angular/material
 */
export class Paginator extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    let pageIndex = Math.max(props.pageIndex, 0);
    this.state = {pageIndex: pageIndex};
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <div>PAGE_SIZE_PART</div>
        <div className="mat-paginator-range-actions">
          <div className="mat-paginator-range-label" />
          <button>FIRST_PAGE</button>
          <button onClick={() => this.handlePrevClick()} disabled={!this.hasPreviousPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: '40px'}}>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button onClick={() => this.handleNextClick()} disabled={!this.hasNextPage()}>
            <svg viewBox="0 0 24 24" focusable="false" style={{width: '40px'}}>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
          <button>LAST_PAGE</button>
        </div>
      </React.Fragment>
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
   * Calculate the number of pages
   */
  private getNumberOfPages(): number {
    return Math.ceil(this.props.length / this.props.pageSize) - 1;
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private emitPageEvent(previousPageIndex: number): void {

    this.props.onPageChange({
      previousPageIndex,
      pageIndex: this.state.pageIndex,
      pageSize: this.props.pageSize,
      length: this.props.length
    });
  }
}
