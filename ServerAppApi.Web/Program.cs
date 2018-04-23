using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Mt.WebVNext.ServerAppApi.Web
{
  public class Program
  {
    public static void Main(string[] args)
    {
      BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .ConfigureLogging(((hostingContext, logging) =>
        {
          logging.SetMinimumLevel(LogLevel.Debug);
        }))
        .UseStartup<Startup>()
        .ConfigureAppConfiguration((hostContext, config) =>
        {
          // In development environment use shared config files
          if(hostContext.HostingEnvironment.IsDevelopment())
          {
            var sharedConfigPath = Path.Combine(hostContext.HostingEnvironment.ContentRootPath, @"..\config");

            config.SetBasePath(sharedConfigPath)
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .AddJsonFile($"appsettings.{hostContext.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true);
         }
        })
        .Build();
  }
}
