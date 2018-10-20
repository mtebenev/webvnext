using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Mt.WebVNext.AppEngine.AppServices;
using Mt.WebVNext.AppEngine.Configuration;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;

namespace Mt.WebVNext.ServerAppApi.Web
{
  /// <summary>
  /// Used to import a sample data
  /// </summary>
  public class DataImportTask
  {
    public async Task Execute(string csvPath, int userId, string connectionString)
    {
      // DB Context
      var optionsBuilder = new DbContextOptionsBuilder<AppDataContext>();
      optionsBuilder.UseSqlServer(connectionString);

      // Automapper
      var autoMapperConfig = new MapperConfiguration(cfg => { cfg.AddProfile<DtoProfile>(); });
      var mapper = autoMapperConfig.CreateMapper();

      // Start execution
      using(var dbContext = new AppDataContext(optionsBuilder.Options))
      {
        var companyDataService = new CompanyDataService(dbContext, mapper);
        var contactDataService = new ContactDataService(dbContext, mapper);
        var dataImportService = new DataImportService(companyDataService, contactDataService);

        Console.WriteLine("Importing data...");
        await ImportContactsAsync(dataImportService, csvPath, userId);
        Console.WriteLine("Done");
      }
    }

    private async Task ImportContactsAsync(DataImportService dataImportService, string csvPath, int userId)
    {
      try
      {
        using (var reader = File.OpenText(csvPath))
        {
          await dataImportService.ImportContactsAsync(reader, userId);
        }
      }
      catch (Exception e)
      {
        Console.WriteLine($"Error occurred when importing contacts: {e}");
      }
    }
  }
}
