using System.Threading.Tasks;
using AutoMapper;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mt.WebVNext.AppEngine.AutoMapperConfig;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

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
      services.AddCors();

      services
        .AddIdentityServer()
        .AddDeveloperSigningCredential()
        .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
        .AddInMemoryClients(IdentityServerConfig.GetClients())
        .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
        .AddTestUsers(IdentityServerConfig.GetUsers());

      services.AddAuthentication("Bearer")
        .AddIdentityServerAuthentication(options =>
        {
          options.Authority = "http://localhost:59613";
          options.RequireHttpsMetadata = false;

          options.ApiName = "api1";
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

      app.UseCors(builder =>
        {
          builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });

      app.UseIdentityServer();

      app.UseDefaultFiles();
      app.UseStaticFiles();

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
      services.AddDbContext<AppDataContext>(options => options.UseSqlServer("Data Source=localhost;Initial Catalog=webvnext;Integrated Security=true;"));
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
