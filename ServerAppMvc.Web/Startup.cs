using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mt.WebVNext.AppEngine.Configuration;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using Microsoft.Extensions.Configuration;

namespace Mt.WebVNext.ServerAppMvc.Web
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      TelemetryConfiguration.Active.DisableTelemetry = true;

      services.AddMvc();

      JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

      services.AddAuthentication(options =>
        {
          options.DefaultScheme = "Cookies";
          options.DefaultChallengeScheme = "oidc";
        })
        .AddCookie("Cookies")
        .AddOpenIdConnect("oidc", options =>
        {
          options.SignInScheme = "Cookies";

          options.Authority = Configuration.Get<AppOptions>().IdentityServerUrl;
          options.RequireHttpsMetadata = false;

          options.ClientId = "mvc";
          options.SaveTokens = true;
        });

      ConfigureContainer(services);
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if(env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
      }


      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseAuthentication();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
          name: "default",
          template: "{controller=Home}/{action=Index}/{id?}");
      });
    }

    /// <summary>
    /// Configures DI container
    /// </summary>
    private void ConfigureContainer(IServiceCollection services)
    {
      // TODO: use shared configuration with API host
      var appConnectionString = Configuration.GetConnectionString("application");

      services.AddDbContext<AppDataContext>(options => options.UseSqlServer(appConnectionString));
      services.AddScoped<IContactDataService, ContactDataService>();
      services.AddScoped<ICompanyDataService, CompanyDataService>();

      // Automapper
      var autoMapperConfig = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<DtoProfile>();
      });

      var mapper = autoMapperConfig.CreateMapper();
      services.AddSingleton(mapper);
    }
  }
}
