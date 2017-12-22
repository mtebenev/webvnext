using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Mt.WebVNext.AppEngine.DataServices
{
  public class PagedResult<T> where T : class
  {
    public PagedResult(T[] rows, int totalRowCount)
    {
      Rows = rows;
      TotalRowCount = totalRowCount;
    }

    public int TotalRowCount { get; private set; }
    public T[] Rows { get; private set; }
  }

  /// <summary>
  /// TODO: Subject to move to a common lib
  /// </summary>
  public static class QueryableExtensions
  {
    public static async Task<PagedResult<T>> GetPagedAsync<T>(this IQueryable<T> query, int page, int pageSize) where T : class
    {
      if(page < 0)
        throw new ArgumentException("Invalid page number. Must be 0-based positive number", nameof(page));

      if(pageSize <= 1)
        throw new ArgumentException("Invalid page size. Must be a positive value", nameof(pageSize));

      var rowCount = await query.CountAsync();
      var recordsToSkip = page * pageSize;

      var resultRows = await query.Skip(recordsToSkip)
        .Take(pageSize)
        .ToArrayAsync();

      return new PagedResult<T>(resultRows, rowCount);
    }
  }

  public static class PagedResultExtensions
  {
    public static PagedResult<U> Project<T, U>(this PagedResult<T> pagedResult, IConfigurationProvider mapperConfigurationProvider)
      where T : class
      where U : class
    {
      var projectedItems = pagedResult.Rows
        .AsQueryable()
        .ProjectTo<U>(mapperConfigurationProvider)
        .ToArray();

      var result = new PagedResult<U>(projectedItems, pagedResult.TotalRowCount);
      return result;
    }
  }
}
