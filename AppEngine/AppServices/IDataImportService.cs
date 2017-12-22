using System.IO;
using System.Threading.Tasks;

namespace Mt.WebVNext.AppEngine.AppServices
{
  /// <summary>
  /// Bulk data import
  /// </summary>
  public interface IDataImportService
  {
    /// <summary>
    /// Data import related operations
    /// </summary>
    Task ImportContactsAsync(TextReader textReader, int userId);
  }
}
