using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace Mt.WebVNext.ServerAppIdentity.Web
{
  public class Program
  {
    public static void Main(string[] args)
    {
      Console.Title = "IdentityServer";

      BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
      WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .Build();
  }
}
