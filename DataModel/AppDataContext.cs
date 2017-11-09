using Microsoft.EntityFrameworkCore;
using Mt.WebVNext.DataModel.Entities.ContactManager;

namespace Mt.WebVNext.DataModel
{
  public class AppDataContext : DbContext
  {
    public AppDataContext(DbContextOptions options)
      : base(options)
    {
    }

    public DbSet<Contact> Contacts { get; set; }
    public DbSet<Company> Companies { get; set; }
  }
}
