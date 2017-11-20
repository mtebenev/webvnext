using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mt.WebVNext.AppEngine.Configuration;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;

namespace Mt.WebVNext.ServerAppApi.Web
{
  public class Startup
  {
    public IConfiguration Configuration { get; private set; }

    public Startup(IHostingEnvironment hostingEnvironment)
    {
      var configurationbuilder = new ConfigurationBuilder()
        .SetBasePath(hostingEnvironment.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

      Configuration = configurationbuilder.Build();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddOptions()
        .Configure<AppOptions>(Configuration);

      services.AddMvc();

      services.AddAuthentication("Bearer")
        .AddIdentityServerAuthentication(options =>
        {
          options.Authority = "http://localhost:63161";
          options.RequireHttpsMetadata = false;

          options.ApiName = "api1";
        });

      services.AddCors(options =>
      {
        // this defines a CORS policy called "default"
        options.AddPolicy("default", policy =>
        {
          policy.WithOrigins("http://localhost:4200")
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
    }

    /// <summary>
    /// Configures DI container
    /// </summary>
    private void ConfigureContainer(IServiceCollection services)
    {
      var appConnectionString = Configuration.GetConnectionString("application");
      // TODO: use shared configuration with common host
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
