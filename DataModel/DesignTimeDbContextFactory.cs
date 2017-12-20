using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Mt.WebVNext.DataModel
{
  public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDataContext>
  {
    public AppDataContext CreateDbContext(string[] args)
    {
      var connectionString = GetConnectionString();

      if(String.IsNullOrWhiteSpace(connectionString))
        throw new InvalidOperationException("Cannot read connection string from coniguration");

      Console.WriteLine(connectionString);

      var builder = new DbContextOptionsBuilder<AppDataContext>();
      builder.UseSqlServer(connectionString);

      return new AppDataContext(builder.Options);
    }

    /// <summary>
    /// Note: track https://github.com/aspnet/EntityFrameworkCore/issues/8332
    /// When passing args in the context factory implemented we can switch to args check
    /// </summary>
    private string GetConnectionString()
    {
      string result;

      var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
      if(environment == "Azure")
      {
        // Note: for now works only when running from source folder directory
        var configPath = Path.Combine(Directory.GetCurrentDirectory(), @"..\config\appsettings.Azure.json");

        var configuration = new ConfigurationBuilder()
          .AddJsonFile(configPath)
          .Build();

        result = configuration.GetConnectionString("application");
      }
      else
      {
        // Get connection string from secrets
        var configuration = new ConfigurationBuilder()
          .AddUserSecrets<DesignTimeDbContextFactory>()
          .Build();

        result = configuration.GetConnectionString("application");
      }

      return result;
    }
  }
}
