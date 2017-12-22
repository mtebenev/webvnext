using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Mt.WebVNext.AppEngine.AppServices;
using Mt.WebVNext.AppEngine.Configuration;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;
using Mt.WebVNext.DataModel.Entities.ContactManager;
using Xunit;

namespace AppEngine.Test.AppServices
{
  public class DataImportServiceTest
  {
    // Sample CSV with 3 contact records
    private static string Csv_Contacts_3 =
      @"""first_name"",""last_name"",""company_name"",""address"",""city"",""county"",""state"",""zip"",""phone1"",""phone2"",""email"",""web""
""James"",""Butt"",""Benton, John B Jr"",""6649 N Blue Gum St"",""New Orleans"",""Orleans"",""LA"",70116,""504-621-8927"",""504-845-1427"",""jbutt@gmail.com"",""http://www.bentonjohnbjr.com""
""Josephine"",""Darakjy"",""Chanay, Jeffrey A Esq"",""4 B Blue Ridge Blvd"",""Brighton"",""Livingston"",""MI"",48116,""810-292-9388"",""810-374-9840"",""josephine_darakjy@darakjy.org"",""http://www.chanayjeffreyaesq.com""
""Art"",""Venere"",""Chemel, James L Cpa"",""8 W Cerritos Ave #54"",""Bridgeport"",""Gloucester"",""NJ"",""08014"",""856-636-8749"",""856-264-4130"",""art@venere.org"",""http://www.chemeljameslcpa.com""";

    [Fact]
    public async Task Add_New_Records()
    {
      var autoMapperConfig = new MapperConfiguration(cfg => { cfg.AddProfile<DtoProfile>(); });

      var mapper = autoMapperConfig.CreateMapper();

      var options = new DbContextOptionsBuilder<AppDataContext>()
        .UseInMemoryDatabase(databaseName: "TestDb")
        .Options;

      using(var dataContext = new AppDataContext(options))
      {
        var companyDs = new CompanyDataService(dataContext, mapper);
        var contactDs = new ContactDataService(dataContext, mapper);
        var service = new DataImportService(companyDs, contactDs);
        using(var stringReader = new StringReader(Csv_Contacts_3))
        {
          await service.ImportContactsAsync(stringReader, 1);
        }

        var contacts = dataContext.Contacts.ToArray();
        var companies = dataContext.Companies.ToArray();

        Assert.True(contacts.Length == 3);
        Assert.True(companies.Length == 3);
      }

    }
  }
}
