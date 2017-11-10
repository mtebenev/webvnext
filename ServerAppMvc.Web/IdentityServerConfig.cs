using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Mt.WebVNext.ServerAppMvc.Web
{
  public class IdentityServerConfig
  {
    public static IEnumerable<Client> GetClients()
    {
      return new List<Client>
      {
        // other clients omitted...

        // resource owner password grant client
        new Client
        {
          ClientId = "ro.client",
          AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

          ClientSecrets =
          {
            new Secret("secret".Sha256())
          },
          AllowedScopes = {"api1"}
        },
        new Client
        {
          ClientId = "angularclient",
          ClientName = "angularclient",
          AllowedGrantTypes = GrantTypes.Implicit,
          AllowAccessTokensViaBrowser = true,

          RedirectUris = {"http://localhost:4200"},
          PostLogoutRedirectUris = {"http://localhost:4200/Unauthorized"},
          AllowedCorsOrigins = {"http://localhost:4200"},

          AllowedScopes =
          {
            IdentityServerConstants.StandardScopes.OpenId,
            IdentityServerConstants.StandardScopes.Profile,
            "api1"
          }
          // Before
          /* 
          ClientName = "angularclient",
          ClientId = "angularclient",
          AccessTokenType = AccessTokenType.Reference,
          AccessTokenLifetime = 330, // 330 seconds, default 60 minutes
          IdentityTokenLifetime = 20,
          AllowedGrantTypes = GrantTypes.Implicit,
          AllowAccessTokensViaBrowser = true,
          RedirectUris = new List<string>
          {
            "http://localhost:4200"

          },
          PostLogoutRedirectUris = new List<string>
          {
            "http://localhost:4200/unauthorized",
            "http://localhost:4200"
          },
          AllowedCorsOrigins = new List<string>
          {
            "https://localhost:4200",
            "http://localhost:4200"
          },
          AllowedScopes = new List<string>
          {
            "openid",
            "dataEventRecords",
            "dataeventrecordsscope",
            "securedFiles",
            "securedfilesscope",
            "role",
            "profile",
            "email",
            "api1"
          }
          */
        }
      };
    }

    public static List<TestUser> GetUsers()
    {
      return new List<TestUser>
      {
        new TestUser
        {
          SubjectId = "1",
          Username = "alice",
          Password = "password"
        },
        new TestUser
        {
          SubjectId = "2",
          Username = "bob",
          Password = "password"
        }
      };
    }

    public static IEnumerable<ApiResource> GetApiResources()
    {
      return new List<ApiResource>
      {
        new ApiResource("api1", "My API")
      };
    }

    public static List<IdentityResource> GetIdentityResources()
    {
      return new List<IdentityResource>
      {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile()
      };
    }
  }
}
