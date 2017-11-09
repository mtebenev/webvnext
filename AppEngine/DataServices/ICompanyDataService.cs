using System.Collections.Generic;
using System.Threading.Tasks;
using Mt.WebVNext.DataModel.Dto.ContactManager;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.AppEngine.DataServices
{
  /// <summary>
  /// Company-related data access
  /// </summary>
  public interface ICompanyDataService
  {
    /// <summary>
    /// Create a new company
    /// </summary>
    Task<Company> CreateCompanyAsync(int userId, CompanyDto companyDto);

    /// <summary>
    /// Retrieves companies for specified user
    /// </summary>
    Task<IList<Company>> GetCompaniesByUserAsync(int userId);
  }
}
