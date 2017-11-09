using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Mt.WebVNext.ServerAppMvc.Web.Core
{
  public static class PageModelExtensions
  {
    /// <summary>
    /// Use to obtain ID of currently authorized user
    /// </summary>
    /// <returns></returns>
    public static int GetCurrentUserId(this PageModel pageModel)
    {
      var result = int.Parse(pageModel.User.GetSubjectId());
      return result;
    }
  }
}
