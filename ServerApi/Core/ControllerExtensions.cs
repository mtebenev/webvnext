using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace ServerApi.Core
{
  public static class ControllerExtensions
  {
    public static int GetCurrentUserId(this Controller controller)
    {
      // TODO: GetSubjectId is extension in IdentityServer. Extract the extension and get rid of IdentityServer package dependency
      var result = int.Parse(controller.User.GetSubjectId());
      return result;
    }
  }
}
