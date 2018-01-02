using Mt.WebVNext.AppEngine.DataServices;

namespace Mt.WebVNext.ServerAppMvc.Web.Models
{
  /// <summary>
  /// Wraps paged result and provides additional properties for navigation
  /// </summary>
  public class PaginatedListModel<T> where T : class
  {
    private readonly PagedResult<T> _pagedResult;

    public PaginatedListModel(PagedResult<T> pagedResult)
    {
      _pagedResult = pagedResult;
    }

    public T[] Rows => _pagedResult.Rows;
    public int PageIndex => _pagedResult.PageIndex;
    public int TotalPages => _pagedResult.TotalPages;

    public bool HasPreviousPage => (PageIndex > 1);
    public bool HasNextPage => (PageIndex < TotalPages);
  }
}
