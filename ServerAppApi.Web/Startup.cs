using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

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
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseCors("default");

      app.UseAuthentication();

      app.UseMvc();
    }
  }
}
