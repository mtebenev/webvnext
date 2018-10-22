using System;
using Microsoft.EntityFrameworkCore;

namespace Mt.WebVNext.DataModel
{
  /// <summary>
  /// App-specific options builder
  /// </summary>
  public static class DbContextOptionsBuilderExtensions
  {
    /// <summary>
    /// Configures db context with a provier
    /// </summary>
    /// <param name="dbProviderName">'sqlite' will configure sqlite provider. Otherwise MSSQL will be used</param>
    public static DbContextOptionsBuilder ConfigureDbContext(this DbContextOptionsBuilder optionsBuilder, string dbProviderName, string connectionString)
    {
      if(!String.IsNullOrEmpty(dbProviderName) && dbProviderName.Equals("sqlite", StringComparison.InvariantCultureIgnoreCase))
        optionsBuilder.UseSqlite(connectionString);
      else
        optionsBuilder.UseSqlServer(connectionString);

      return optionsBuilder;
    }
  }
}
