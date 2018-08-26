using System;
using System.Reflection;
using AutoMapper;
using ClientApp.Angular;
using ClientApp.React;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mt.WebVNext.AppEngine.AppServices;
using Mt.WebVNext.AppEngine.Configuration;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;
using YesSpa.AspNetCore;

namespace Mt.WebVNext.ServerAppApi.Web
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
      var appOptions = Configuration.Get<AppOptions>();

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
      services.AddYesSpa();

      services.AddAuthentication("Bearer")
        .AddIdentityServerAuthentication(options =>
        {
          options.Authority = appOptions.IdentityServerUrl;
          options.RequireHttpsMetadata = false;

          options.ApiName = "api1";
        });

      services.AddCors(options =>
      {
        // this defines a CORS policy called "default"
        options.AddPolicy("default", policy =>
        {
          policy.WithOrigins(appOptions.ApiClientUrls)
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
      });

      ConfigureContainer(services);
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseCors("default");
      app.UseAuthentication();
      app.UseMvc();

      app.UseSpa(builder =>
      {
        builder.Options.UseStubPage = false;
        builder.AddSpa(Assembly.GetAssembly(typeof(ClientAppModuleReact)), "/react/", "/.Modules/ClientApp.React/build");
        builder.AddSpa(Assembly.GetAssembly(typeof(ClientAppModuleAngular)), "/angular/", "/.Modules/ClientApp.Angular/dist");
      });
    }

    /// <summary>
    /// Configures DI container
    /// </summary>
    private void ConfigureContainer(IServiceCollection services)
    {
      var appConnectionString = Configuration.GetConnectionString("application");

      if(string.IsNullOrEmpty(appConnectionString))
        throw new InvalidOperationException("Cannot get connection string from settings.");

      services.AddDbContext<AppDataContext>(options => options.UseSqlServer(appConnectionString));
      services.AddScoped<IContactDataService, ContactDataService>();
      services.AddScoped<ICompanyDataService, CompanyDataService>();
      services.AddScoped<IDataImportService, DataImportService>();

      // Automapper
      var autoMapperConfig = new MapperConfiguration(cfg => { cfg.AddProfile<DtoProfile>(); });

      var mapper = autoMapperConfig.CreateMapper();
      services.AddSingleton(mapper);
    }
  }
}
