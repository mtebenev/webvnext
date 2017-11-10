using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mt.WebVNext.AppEngine.AutoMapperConfig;
using Mt.WebVNext.AppEngine.DataServices;
using Mt.WebVNext.DataModel;

namespace Mt.WebVNext.ServerAppApi.Web
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
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
      // TODO: use shared configuration with common host
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
