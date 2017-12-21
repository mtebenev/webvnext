using System.IO;
using System.Threading.Tasks;
using CsvHelper;

namespace Mt.WebVNext.AppEngine.AppServices
{
  /// <summary>
  /// Data import related operations
  /// </summary>
  public class DataImportService
  {
    public async Task ImportContactsAsync(TextReader textReader)
    {
      var csvReader = new CsvReader(textReader);
      csvReader.ReadHeader();

      await Task.FromResult(0);
    }
  }
}
