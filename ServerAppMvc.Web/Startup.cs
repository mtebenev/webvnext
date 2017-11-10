using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
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

      services.AddAuthentication()
        .AddGoogle("Google", options =>
        {
          options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

          options.ClientId = "434483408261-55tc8n0cs4ff1fe21ea8df2o443v2iuc.apps.googleusercontent.com";
          options.ClientSecret = "3gcoTrEDPPJ0ukn_aYYT6PWo";
        })
        .AddOpenIdConnect("oidc", "OpenID Connect", options =>
        {
          options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
          options.SignOutScheme = IdentityServerConstants.SignoutScheme;

          options.Authority = "https://demo.identityserver.io/";
          options.ClientId = "implicit";

          options.TokenValidationParameters = new TokenValidationParameters
          {
            NameClaimType = "name",
            RoleClaimType = "role"
          };
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
