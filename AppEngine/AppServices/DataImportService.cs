using System.IO;
using System.Threading.Tasks;
using CsvHelper;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel.Dto.ContactManager;

namespace Mt.WebVNext.AppEngine.AppServices
{
  public class DataImportService : IDataImportService
  {
    private readonly IContactDataService _contactDataService;
    private readonly ICompanyDataService _companyDataService;

    public DataImportService(ICompanyDataService companyDataService, IContactDataService contactDataService)
    {
      _contactDataService = contactDataService;
      _companyDataService = companyDataService;
    }

    public async Task ImportContactsAsync(TextReader textReader, int userId)
    {
      var csvReaderConfiguration = new CsvHelper.Configuration.Configuration
      {
        BadDataFound = (readingContext) =>
        {
          // TODO: implement this
        }
      };
      var csvReader = new CsvReader(textReader, csvReaderConfiguration);
      await csvReader.ReadAsync();
      csvReader.ReadHeader();

      while(await csvReader.ReadAsync())
      {
        var firstName = csvReader["first_name"];
        var lastName = csvReader["last_name"];
        var companyName = csvReader["company_name"];

        var companyDto = new CompanyDto
        {
          Name = companyName
        };

        var company = await _companyDataService.CreateCompanyAsync(userId, companyDto);

        ContactDto contactDto = new ContactDto
        {
          FirstName = firstName,
          LastName = lastName,
          CompanyId = company.CompanyId
        };

        await _contactDataService.CreateContactAsync(userId, contactDto);
      }
    }
  }
}
