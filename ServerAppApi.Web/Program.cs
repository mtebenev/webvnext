using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Mt.WebVNext.ServerAppApi.Web
{
  public class Program
  {
    public static async Task Main(string[] args)
    {
      if(args.Length > 1 && args[0].Equals("import", StringComparison.InvariantCultureIgnoreCase))
        await RunDataImport(args);
      else
        CreateWebHostBuilder(args).Build().Run();
    }

    private static async Task RunDataImport(string[] args)
    {
      if(args.Length < 5)
        throw new ArgumentException(@"Invalid command line. Expected arguments: import <csv_file_path> <user_id> <db_provider_name> <connection_string>");

      if(!File.Exists(args[1]))
        throw new ArgumentException($"Cannot find data file {args[1]}");

      if(!int.TryParse(args[2], out var userId))
        throw new ArgumentException($"User ID is invalid");

      // Launch task
      var task = new DataImportTask();
      await task.Execute(args[1], userId, args[3], args[4].Trim('\"'));
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .ConfigureLogging(((hostingContext, logging) => { logging.SetMinimumLevel(LogLevel.Debug); }))
        .UseStartup<Startup>()
        .ConfigureAppConfiguration((hostContext, config) =>
        {
          var sharedConfigPath = Path.Combine(hostContext.HostingEnvironment.ContentRootPath, @"../config");

          config.SetBasePath(sharedConfigPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{hostContext.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true);
        });
  }
}
