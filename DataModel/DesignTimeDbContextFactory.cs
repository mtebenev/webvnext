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
      var dbConnectionInfo = GetDbConnectionInfo();

      if(String.IsNullOrWhiteSpace(dbConnectionInfo.connStr))
        throw new InvalidOperationException("Cannot read connection string from coniguration");

      Console.WriteLine($"Using db provider: {dbConnectionInfo.dbProvidername}");
      Console.WriteLine($"Using connection string: {dbConnectionInfo.connStr}");

      var builder = new DbContextOptionsBuilder<AppDataContext>();
      builder.ConfigureDbContext(dbConnectionInfo.dbProvidername, dbConnectionInfo.connStr);

      return new AppDataContext(builder.Options);
    }

    /// <summary>
    /// Note: track https://github.com/aspnet/EntityFrameworkCore/issues/8332
    /// When passing args in the context factory implemented we can switch to args check
    /// </summary>
    private (string dbProvidername, string connStr) GetDbConnectionInfo()
    {
      string dbProvidername;
      string connectionString;

      var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
      if(environment == "Azure")
      {
        // Note: for now works only when running from source folder directory
        var configPath = Path.Combine(Directory.GetCurrentDirectory(), @"..\config\appsettings.Azure.json");

        var configuration = new ConfigurationBuilder()
          .AddJsonFile(configPath)
          .Build();

        dbProvidername = "MSSQL";
        connectionString = configuration.GetConnectionString("application");
      }
      else
      {
        // Get connection string from secrets
        var configuration = new ConfigurationBuilder()
          .AddUserSecrets<DesignTimeDbContextFactory>()
          .Build();

        connectionString = configuration.GetConnectionString("application");
        dbProvidername = configuration.GetValue<string>("dbProviderName");
        dbProvidername = String.IsNullOrEmpty(dbProvidername) || !dbProvidername.Equals("sqlite", StringComparison.InvariantCultureIgnoreCase)
          ? "MSSQL"
          : "sqlite";

        if(string.IsNullOrEmpty(connectionString))
          throw new InvalidOperationException("Cannot get connection string from settings.");
      }

      return (dbProvidername, connectionString);
    }
  }
}
