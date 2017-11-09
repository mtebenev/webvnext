using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Mt.WebVNext.DataModel
{
  public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDataContext>
  {
    public AppDataContext CreateDbContext(string[] args)
    {
      var builder = new DbContextOptionsBuilder<AppDataContext>();
      builder.UseSqlServer("Data Source=localhost;Initial Catalog=webvnext;Integrated Security=true;");
      return new AppDataContext(builder.Options);
    }
  }
}
