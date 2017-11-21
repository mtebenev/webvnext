using IdentityServer4;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Mt.WebVNext.ServerAppIdentity.Web.Configuration;
using QuickstartIdentityServer;

namespace Mt.WebVNext.ServerAppIdentity.Web
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

      services.AddMvc();


      // configure identity server with in-memory stores, keys, clients and scopes
      services.AddIdentityServer()
        .AddDeveloperSigningCredential()
        .AddInMemoryIdentityResources(Config.GetIdentityResources())
        .AddInMemoryApiResources(Config.GetApiResources())
        .AddInMemoryClients(appOptions.Clients)
        .AddTestUsers(Config.GetUsers());

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
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if(env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseIdentityServer();

      app.UseStaticFiles();
      app.UseMvcWithDefaultRoute();
    }
  }
}
