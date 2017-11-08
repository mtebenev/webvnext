using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mt.Psyworks.AppEngine.AutoMapperConfig;
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
      services.AddMvc();
      services.AddCors();
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
            .AllowAnyHeader();
        });

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
      services.AddDbContext<AppDataContext>(options => options.UseInMemoryDatabase("MemoryDb"));
      services.AddScoped<IContactDataService, ContactDataService>();

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
